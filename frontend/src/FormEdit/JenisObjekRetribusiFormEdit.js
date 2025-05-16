import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JenisObjekRetribusiFormEdit = () => {
  const [jenisObjekRetribusi, setJenis] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
      .then((res) => {
        setJenis(res.data.data.jenisObjekRetribusi);
        setKeterangan(res.data.data.keterangan || "");
      })
      .catch(() => alert("Gagal memuat data."));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/jenis-objek-retribusi/${id}`, {
      jenisObjekRetribusi,
      keterangan,
    })
      .then(() => navigate("/jenis-objek-retribusi"))
      .catch(() => alert("Gagal update data."));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Jenis Objek Retribusi</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default JenisObjekRetribusiFormEdit;
