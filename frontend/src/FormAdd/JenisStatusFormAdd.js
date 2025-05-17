import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const AddJenisStatus = () => {
  const [form, setForm] = useState({ status: "Proses", keterangan: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana di frontend
    if (!form.status) {
      alert("Jenis status harus dipilih.");
      return;
    }

    axios
      .post(API, form)
      .then(() => {
        alert("Data berhasil ditambahkan.");
        navigate("/"); // arahkan sesuai kebutuhan
      })
      .catch((err) => {
        console.error("Gagal menambahkan:", err.response || err);
        alert(
          err.response?.data?.message ||
            "Terjadi kesalahan saat menambahkan data."
        );
      });
  };

  return (
    <div className="container">
      <div className="form-header">
        <h2>Tambah Jenis Status</h2>
      </div>

      <p className="form-description">
        Silakan isi formulir di bawah ini untuk menambahkan jenis status baru.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status" className="form-label required">
            Jenis Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Proses">Proses</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
          <div className="form-example">
            Contoh: Proses, Disetujui, Ditolak, Dibatalkan
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="keterangan" className="form-label">
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="keterangan"
            className="form-textarea"
            value={form.keterangan}
            onChange={handleChange}
            placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="btn btn-primary">
            <span className="btn-icon">💾</span> Simpan Data
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/jenisstatus")}
          >
            <span className="btn-icon">✖️</span> Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJenisStatus;
