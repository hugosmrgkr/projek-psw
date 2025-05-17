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
      .then(() => {
        alert("Data berhasil ditambahkan!");
        navigate("/jenis-objek-retribusi");
      })
      .catch(() => alert("Gagal menambah data."));
  };

  const handleCancel = () => {
    navigate("/jenis-objek-retribusi");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">➕ Tambah Jenis Objek Retribusi</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Jenis Objek <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Contoh: Parkir, Pasar, Terminal"
                value={jenisObjekRetribusi}
                onChange={(e) => setJenis(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Keterangan</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Masukkan deskripsi atau penjelasan tambahan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Batal
              </button>
              <button type="submit" className="btn btn-success">
                💾 Simpan Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JenisObjekRetribusiFormAdd;
