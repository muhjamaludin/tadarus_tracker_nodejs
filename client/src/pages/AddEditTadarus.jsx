import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const backendApi = import.meta.env.VITE_APP_API_URL;

const AddEditTadarus = () => {
  const [juz, setJuz] = useState("");
  const [surah, setSurah] = useState("");
  const [ayat, setAyat] = useState("");
  const [dateTadarus, setDateTadarus] = useState("");
  const [timeTadarus, setTimeTadarus] = useState("");
  const [listJuz, setListJuz] = useState([]);
  const [listSurah, setListSurah] = useState([]);
  const [listAyat, setListAyat] = useState([]);
  const { id } = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    id ? getTadarusById() : "";
    getListJuz();
  }, []);

  const getTadarusById = async () => {
    try {
      const response = await axios.get(`${backendApi}/api/tadarus/${id}`);
      setJuz(response.data.juz);
      setSurah(response.data.surah);
      setAyat(response.data.ayat);
      setDateTadarus(response.data.date);
      setTimeTadarus(response.data.time);

      id ? getListSurahByJuz(response.data.juz, response.data.surah) : "";
    } catch (error) {
      alert(error.message);
    }
  };

  const getListJuz = async () => {
    try {
      const response = await axios.get(`${backendApi}/api/juz`);
      response.data.unshift("-");
      setListJuz(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const getListSurahByJuz = async (juz, surahName) => {
    try {
      const response = await axios.get(`${backendApi}/api/juz/${juz}/surah`);
      response.data.unshift({ surah: "-", number: 0 });
      setListSurah(response.data);
      id ? setChangedAyat(response.data, surahName) : "";
    } catch (error) {
      alert(error.message);
    }
  };

  const saveTadarusRecord = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${backendApi}/api/tadarus`, {
        juz,
        surah,
        ayat,
        date: dateTadarus,
        time: timeTadarus,
      });

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const updateTadarus = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendApi}/api/tadarus/${id}`, {
        juz,
        surah,
        ayat,
        date: dateTadarus,
        time: timeTadarus,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  function onchangeSelectJuz(e) {
    e.preventDefault();

    const idJuz = e.target.value;
    setJuz(idJuz);
    setSurah("");
    getListSurahByJuz(idJuz);
  }

  function onChangeSelectSurah(e) {
    e.preventDefault();

    const surahName = e.target.value;
    setSurah(surahName);
    setChangedAyat(listSurah, surahName);
  }

  function setChangedAyat(list, surahName) {
    const rangeAyat = list.filter((s) => s.surah == surahName)[0].ayat || "1-1";
    const [start, end] = rangeAyat.split("-");
    const ayats = [];
    for (let i = Number(start); i <= end; i++) {
      ayats.push(i);
    }
    ayats.unshift("-");
    setListAyat(ayats);
  }

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <Navbar />
          <h1 className="mt-2 mb-3 title">{id ? "Edit" : "Add"} Record</h1>
          <form onSubmit={id ? updateTadarus : saveTadarusRecord}>
            <div className="field">
              <label className="label">Juz</label>
              <div className="select">
                <select onChange={onchangeSelectJuz} value={juz}>
                  {listJuz &&
                    listJuz.map((j) => {
                      return (
                        <option value={j} key={j}>
                          {j}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Surah</label>
              <div className="select">
                <select onChange={onChangeSelectSurah} value={surah}>
                  {listSurah &&
                    listSurah.map((s) => {
                      return (
                        <option value={s.surah} key={s.number}>
                          {s.surah}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Ayat</label>
              <div className="select">
                <select onChange={(e) => setAyat(e.target.value)} value={ayat}>
                  {listAyat &&
                    listAyat.map((a) => {
                      return (
                        <option value={a} key={a}>
                          {a}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  type="date"
                  className="input is-primary"
                  placeholder="01-01-2023"
                  value={dateTadarus}
                  min="2023-01-01"
                  onChange={(e) => setDateTadarus(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Time</label>
              <div className="control">
                <input
                  type="time"
                  className="input is-primary"
                  placeholder="00:00"
                  value={timeTadarus}
                  onChange={(e) => setTimeTadarus(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <button
                type="submit"
                className={`button ${id ? "is-info" : "is-success"}`}
              >
                {id ? "Edit" : "Save"}
              </button>
              <Link className="button ml-5 is-light" to={"/"}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditTadarus;
