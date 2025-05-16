import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000/api/users";

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
    const payload = {
      ...form,
      isDeleted: form.status === "Nonaktif" ? true : false,
    };

    axios.post(API, payload).then(() => navigate("/user"));
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="form-header">
          <h2 className="page-title">Tambah User</h2>
        </div>

        <div className="form-description">
          Silakan isi formulir di bawah ini untuk menambahkan user baru.
        </div>

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

      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app-container {
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 20px;
        }

        /* Main content area */
        .content-container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* Form header */
        .form-header {
          margin-bottom: 10px;
          padding-left: 10px;
          border-left: 4px solid #3b82f6;
        }

        .page-title {
          color: #1e293b;
          font-size: 24px;
          font-weight: 600;
        }
        
        .form-description {
          margin-bottom: 20px;
          color: #64748b;
        }

        /* Form styling */
        .user-form {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #475569;
        }

        .required {
          color: #ef4444;
        }

        .form-hint {
          margin-top: 4px;
          color: #64748b;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 15px;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        /* Form action buttons */
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .button-icon {
          margin-right: 6px;
        }

        .cancel-button {
          padding: 10px 16px;
          background-color: #f1f5f9;
          color: #64748b;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s;
        }

        .cancel-button:hover {
          background-color: #e2e8f0;
        }

        .submit-button {
          padding: 10px 16px;
          background-color: #22c55e;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #16a34a;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .form-actions {
            flex-direction: column-reverse;
          }
          
          .submit-button, .cancel-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default UserFormAdd;