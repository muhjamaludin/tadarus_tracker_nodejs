import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const backendApi = import.meta.env.VITE_APP_API_URL;

const AddEditTadarus = () => {
  const [juz, setJuz] = useState("");
  const [surah, setSurah] = useState("");
  const [ayat, setAyat] = useState("");
  const [dateTadarus, setDateTadarus] = useState("");
  const [timeTadarus, setTimeTadarus] = useState("");
  const { id } = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    id ? getTadarusById() : "";
  }, []);

  const getTadarusById = async () => {
    try {
      const response = await axios.get(`${backendApi}/api/tadarus/${id}`);
      setJuz(response.data.juz);
      setSurah(response.data.surah);
      setAyat(response.data.ayat);
      setDateTadarus(response.data.date);
      setTimeTadarus(response.data.time);
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

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="mt-2 mb-3 title">{id ? "Edit" : "Add"} Record</h1>
        <form onSubmit={id ? updateTadarus : saveTadarusRecord}>
          <div className="field">
            <label className="label">Juz</label>
            <div className="control">
              <input
                type="number"
                className="input is-primary"
                placeholder="1"
                value={juz}
                onChange={(e) => setJuz(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Surah</label>
            <div className="control">
              <input
                type="text"
                className="input is-primary"
                placeholder="Al Fatihah"
                value={surah}
                onChange={(e) => setSurah(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Ayat</label>
            <div className="control">
              <input
                type="number"
                className="input is-primary"
                placeholder="1"
                value={ayat}
                onChange={(e) => setAyat(e.target.value)}
                required
              />
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
  );
};

export default AddEditTadarus;
