import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const backendApi = import.meta.env.VITE_APP_API_URL;

const TadarusList = () => {
  const [tadaruses, setTadaruses] = useState([]);

  useEffect(() => {
    getTadarus();
  }, []);

  const getTadarus = async () => {
    const response = await axios.get(`${backendApi}/api/tadarus`);
    setTadaruses(response.data);
  };

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <Navbar />
          <h1 className="mb-3 title has-text-centered">
            Daftar Tadarus Alquran
          </h1>
          <Link to={"add"} className="button mb-5 is-success">
            Add New Record
          </Link>
          <table className="table is-hoverable is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Juz</th>
                <th>Surah</th>
                <th>Ayat</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tadaruses &&
                tadaruses.map((tadarus, index) => (
                  <tr key={tadarus.id}>
                    <td>{index + 1}</td>
                    <td>{tadarus.date}</td>
                    <td>{tadarus.juz}</td>
                    <td>{tadarus.surah}</td>
                    <td>{tadarus.ayat}</td>
                    <td>{tadarus.time}</td>
                    <td>
                      <Link
                        className="button is-small is-info"
                        to={`/edit/${tadarus.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TadarusList;
