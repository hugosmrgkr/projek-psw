import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./UserForm.css"; // Import the external CSS file

const API = "http://127.0.0.1:8000/api/user";

const UserFormAdd = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
    keterangan: "",
    status: "Aktif",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  const payload = {
    username: form.username,
    email: form.email,
    password: form.password,
    keterangan: form.keterangan,
    isDeleted: form.status === "Nonaktif",
  };

  axios.post(API, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => navigate("/user"))
  .catch((err) => {
    console.error("Gagal menyimpan user:", err.response || err);
    alert("Gagal menyimpan user. Pastikan token valid dan endpoint benar.");
  });
};

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="form-header">
          <h2 className="page-title">Tambah User</h2>
        </div>

        <div className="form-description">Silakan isi formulir di bawah ini untuk menambahkan user baru.</div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              type="password"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="token">Token</label>
            <input
              id="token"
              name="token"
              value={form.token}
              onChange={handleChange}
              placeholder="Masukkan token (opsional)"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
            <div className="form-hint">Contoh: Aktif, Nonaktif</div>
          </div>

          <div className="form-group">
            <label htmlFor="keterangan">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              rows="3"
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/user")}>
              <span className="button-icon">✕</span> Batal
            </button>
            <button type="submit" className="submit-button">
              <span className="button-icon">💾</span> Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormAdd;
