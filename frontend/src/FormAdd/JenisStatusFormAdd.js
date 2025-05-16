import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const AddJenisStatus = () => {
  const [form, setForm] = useState({ jenisStatus: "Proses", keterangan: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API, form)
      .then(() => {
        alert("Data berhasil ditambahkan.");
        navigate("/");
      })
      .catch((err) => {
        console.error("Gagal menambahkan:", err);
        alert("Terjadi kesalahan saat menambahkan data.");
      });
  };

  return (
    <>
      <style>{`
        /* Main container styling */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Form header styling */
        .form-header {
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-header h2 {
          color: #333;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .form-header h2::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 24px;
          background-color: #4f46e5;
          margin-right: 10px;
          border-radius: 2px;
        }

        /* Form description */
        .form-description {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 30px;
        }

        /* Form styling */
        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #4b5563;
          font-weight: 500;
          font-size: 16px;
        }

        .required::after {
          content: "*";
          color: #ef4444;
          margin-left: 4px;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border-radius: 4px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          transition: border-color 0.15s ease-in-out;
        }

        .form-control:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }

        .form-select {
          width: 100%;
          padding: 10px 12px;
          border-radius: 4px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          background-color: #fff;
          appearance: auto;
        }

        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 4px;
          border: 1px solid #d1d5db;
          font-size: 16px;
          min-height: 100px;
          resize: vertical;
        }

        .form-example {
          font-size: 14px;
          color: #6b7280;
          margin-top: 6px;
        }

        /* Button styles */
        .button-container {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s ease-in-out;
        }

        .btn-primary {
          background-color: #4ade80;
          color: #fff;
          border: none;
        }

        .btn-primary:hover {
          background-color: #22c55e;
        }

        .btn-secondary {
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background-color: #e5e7eb;
        }

        .btn-icon {
          margin-right: 8px;
          font-size: 18px;
        }
      `}</style>
      <div className="container">
        <div className="form-header">
          <h2>Tambah Jenis Status</h2>
        </div>

        <p className="form-description">
          Silakan isi formulir di bawah ini untuk menambahkan jenis status baru.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="jenisStatus" className="form-label required">
              Jenis Status
            </label>
            <select
              id="jenisStatus"
              name="jenisStatus"
              className="form-select"
              value={form.jenisStatus}
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
              <span className="btn-icon">💾</span>
              Simpan Data
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              <span className="btn-icon">✖️</span>
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJenisStatus;