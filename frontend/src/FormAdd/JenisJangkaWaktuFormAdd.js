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
    }
  };

  const handleCancel = () => {
    setJenisJangkaWaktu("");
    setKeterangan("");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Tambah Jenis Jangka Waktu</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jenisJangkaWaktu" className="form-label">
            Jenis Jangka Waktu
          </label>
          <input
            type="text"
            className="form-control"
            id="jenisJangkaWaktu"
            placeholder="Masukkan jenis jangka waktu"
            value={jenisJangkaWaktu}
            onChange={(e) => setJenisJangkaWaktu(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="keterangan" className="form-label">
            Keterangan
          </label>
          <textarea
            className="form-control"
            id="keterangan"
            rows="4"
            placeholder="Masukkan keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCancel}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTambahJenisJangkaWaktu;
