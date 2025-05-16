// src/pages/UserFormEdit.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";


const API = "http://localhost:8000/api/users";

const UserFormEdit = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    token: "",
    keterangan: "",
    status: "Aktif",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/${id}`)
      .then((res) => {
        const user = res.data.data;
        setForm({
          username: user.username,
          email: user.email,
          token: user.token || "",
          password: "",
          keterangan: user.keterangan || "",
          status: user.isDeleted ? "Nonaktif" : "Aktif",
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      isDeleted: form.status === "Nonaktif" ? true : false,
    };

    // Remove empty password if not changed
    if (!payload.password) {
      delete payload.password;
    }

    axios.put(`${API}/${id}`, payload).then(() => navigate("/user"));
  };

  return (
    <div className="app-container">
     
      <div className="content-container">
        <div className="form-container">
          <div className="form-header">
            <h2 className="page-title">Edit User</h2>
            <Link to="/user" className="back-button">Kembali</Link>
          </div>
          
          {loading ? (
            <div className="loading-indicator">Memuat data user...</div>
          ) : (
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  id="username"
                  name="username" 
                  value={form.username} 
                  onChange={handleChange} 
                  placeholder="Masukkan username" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email"
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="Masukkan email" 
                  required 
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
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  placeholder="Kosongkan jika tidak ingin mengubah password" 
                  type="password"
                />
                <small className="password-hint">Kosongkan jika tidak ingin mengubah password</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status"
                  name="status" 
                  value={form.status} 
                  onChange={handleChange}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="keterangan">Keterangan</label>
                <textarea
                  id="keterangan"
                  name="keterangan" 
                  value={form.keterangan} 
                  onChange={handleChange} 
                  placeholder="Masukkan keterangan (opsional)"
                  rows="3"
                />
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => navigate("/user")}>
                  Batal
                </button>
                <button type="submit" className="submit-button">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
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
          display: flex;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        /* Main content area */
        .content-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        /* Form container */
        .form-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Form header */
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #eaedf3;
        }

        .page-title {
          color: #2d3748;
          font-size: 24px;
          font-weight: 600;
        }

        .back-button {
          display: inline-block;
          background-color: #64748b;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .back-button:hover {
          background-color: #475569;
        }

        /* Loading indicator */
        .loading-indicator {
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 16px;
        }

        /* Form styling */
        .user-form {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #4b5563;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 15px;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #9ca3af;
        }

        .password-hint {
          display: block;
          margin-top: 6px;
          color: #6b7280;
          font-size: 13px;
          font-style: italic;
        }

        /* Form action buttons */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 32px;
        }

        .cancel-button {
          padding: 10px 20px;
          background-color: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-button:hover {
          background-color: #e5e7eb;
        }

        .submit-button {
          padding: 10px 20px;
          background-color: #1e40af; /* Deep blue to match sidebar */
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #2563eb;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .form-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .submit-button, .cancel-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default UserFormEdit;