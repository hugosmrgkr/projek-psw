import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JenisObjekRetribusiFormAdd = () => {
  const [jenisObjekRetribusi, setJenis] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/jenis-objek-retribusi", {
      jenisObjekRetribusi,
      keterangan,
    })
      .then(() => navigate("/jenis-objek-retribusi"))
      .catch(() => alert("Gagal menambah data."));
  };

  return (
    <div className="container mt-4">
      <h2>Tambah Jenis Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Jenis Objek</label>
          <input
            type="text"
            className="form-control"
            value={jenisObjekRetribusi}
            onChange={(e) => setJenis(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          <textarea
            className="form-control"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Simpan</button>
      </form>
    </div>
  );
};

export default JenisObjekRetribusiFormAdd;
