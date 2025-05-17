import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const JenisObjekRetribusiFormEdit = () => {
  const [jenisObjekRetribusi, setJenis] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
      .then((res) => {
        setJenis(res.data.data.jenisObjekRetribusi);
        setKeterangan(res.data.data.keterangan || "");
      })
      .catch(() => alert("Gagal memuat data."));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/jenis-objek-retribusi/${id}`, {
        jenisObjekRetribusi,
        keterangan,
      })
      .then(() => {
        alert("Data berhasil diperbarui!");
        navigate("/jenis-objek-retribusi");
      })
      .catch(() => alert("Gagal update data."));
  };

  const handleCancel = () => {
    navigate("/jenis-objek-retribusi");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">✏️ Edit Jenis Objek Retribusi</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label fw-bold">Jenis Objek <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan jenis objek"
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
                placeholder="Masukkan keterangan tambahan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                🔙 Batal
              </button>
              <button type="submit" className="btn btn-success">
                💾 Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JenisObjekRetribusiFormEdit;
