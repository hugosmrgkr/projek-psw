import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const EditJenisStatus = () => {
  const [form, setForm] = useState({ jenisStatus: "", keterangan: "" });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setForm({
          jenisStatus: res.data.jenisStatus || "Proses",
          keterangan: res.data.keterangan || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        alert("Data tidak ditemukan.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/${id}`, form)
      .then(() => {
        alert("Data berhasil diupdate.");
        navigate("/");
      })
      .catch((err) => {
        console.error("Gagal update:", err);
        alert("Terjadi kesalahan saat update.");
      });
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div>
      <h2>Edit Jenis Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jenis Status</label>
          <select name="jenisStatus" value={form.jenisStatus} onChange={handleChange}>
            <option value="Proses">Proses</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
        <div>
          <label>Keterangan</label>
          <textarea name="keterangan" value={form.keterangan} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditJenisStatus;
