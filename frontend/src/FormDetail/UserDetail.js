import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams(); // Ambil userId dari URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data user:", err);
      });
  }, [id]);

  if (!user) {
    return <div className="loading">Memuat detail user...</div>;
  }

  return (
    <div className="detail-container">
      <h2>Detail User</h2>
      <div className="detail-card">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.isDeleted ? "Nonaktif" : "Aktif"}</p>
        <p><strong>Keterangan:</strong> {user.keterangan}</p>
      </div>
      <Link to="/user" className="back-button">← Kembali ke Daftar User</Link>

      <style jsx>{`
        .detail-container {
          padding: 20px;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #1e293b;
        }

        .detail-card {
          background: #ffffff;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 16px;
        }

        .detail-card p {
          font-size: 16px;
          margin-bottom: 10px;
          color: #334155;
        }

        .back-button {
          display: inline-block;
          padding: 10px 16px;
          background-color: #1e40af;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .back-button:hover {
          background-color: #2563eb;
        }

        .loading {
          padding: 20px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default UserDetail;
