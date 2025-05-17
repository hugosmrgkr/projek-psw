import React, { useState } from "react";
import axios from "axios";

const FormTambahJenisJangkaWaktu = () => {
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/jenis-jangka-waktu", {
        jenisJangkaWaktu,
        keterangan,
      });
      alert("Data berhasil ditambahkan.");
      setJenisJangkaWaktu("");
      setKeterangan("");
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
      alert("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  const handleCancel = () => {
    setJenisJangkaWaktu("");
    setKeterangan("");
  };

  return (
    <div
      className="container mt-5 p-4 bg-light rounded shadow-sm"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="mb-4 text-center text-primary fw-bold">
        Tambah Jenis Jangka Waktu
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="jenisJangkaWaktu" className="form-label fw-semibold">
            Jenis Jangka Waktu <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control form-control-lg border-primary"
            id="jenisJangkaWaktu"
            placeholder="Masukkan jenis jangka waktu"
            value={jenisJangkaWaktu}
            onChange={(e) => setJenisJangkaWaktu(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label htmlFor="keterangan" className="form-label fw-semibold">
            Keterangan
          </label>
          <textarea
            className="form-control border-primary"
            id="keterangan"
            rows="4"
            placeholder="Masukkan keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={handleCancel}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary px-4">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTambahJenisJangkaWaktu;
