import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API = "http://localhost:8000/api/jenis-permohonan";

const JenisPermohonanList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setPosts(res.data.data || []); // fallback array kosong kalau tidak ada data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setPosts(posts.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error("Gagal hapus:", err);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="data-list-container">
          <div className="header-container">
            <h2 className="page-title">Data Jenis Permohonan</h2>
            <Link to="/jenispermohonan/tambah" className="add-button">
              + Tambah Data
            </Link>
          </div>

          <div className="table-container">
            {loading ? (
              <div className="loading-indicator">Memuat data...</div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                Belum ada data jenis permohonan.
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th width="60">#</th>
                    <th>Jenis Permohonan</th>
                    <th width="180">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.jenisPermohonan}</td>
                      <td className="action-buttons">
                        <Link
                          to={`/JenisPermohonanFormDetail/${item.id}`}
                          className="view-button"
                          title="Lihat Detail"
                        >
                          <span className="action-icon">👁️</span>
                        </Link>
                        <Link
                          to={`/JenisPermohonan/edit/${item.id}`}
                          className="edit-button"
                          title="Edit Data"
                        >
                          <span className="action-icon">✏️</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="delete-button"
                          title="Hapus Data"
                        >
                          <span className="action-icon">🗑️</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

        /* Data list container */
        .data-list-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        /* Header with title and add button */
        .header-container {
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

        .add-button {
          display: inline-block;
          background-color: #1e40af; /* Deep blue to match sidebar */
          color: white;
          padding: 10px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .add-button:hover {
          background-color: #2563eb;
        }

        /* Table container */
        .table-container {
          padding: 0 0 20px 0;
          overflow-x: auto;
        }

        /* Loading and empty states */
        .loading-indicator,
        .empty-state {
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 16px;
        }

        /* Table styles */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background-color: #f8fafc;
          padding: 16px 24px;
          text-align: left;
          font-weight: 600;
          color: #64748b;
          font-size: 14px;
          white-space: nowrap;
          border-bottom: 1px solid #eaedf3;
        }

        .data-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #eaedf3;
          color: #4a5568;
        }

        .data-table tr:hover {
          background-color: #f8fafc;
        }

        .text-center {
          text-align: center;
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .view-button,
        .edit-button,
        .delete-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .view-button {
          background-color: #0ea5e9;
          color: white;
          text-decoration: none;
        }

        .view-button:hover {
          background-color: #0284c7;
        }

        .edit-button {
          background-color: #f59e0b;
          color: white;
          text-decoration: none;
        }

        .edit-button:hover {
          background-color: #d97706;
        }

        .delete-button {
          background-color: #ef4444;
          color: white;
          border: none;
          cursor: pointer;
        }

        .delete-button:hover {
          background-color: #dc2626;
        }

        .action-icon {
          font-size: 16px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .add-button {
            width: 100%;
            text-align: center;
          }

          .action-buttons {
            display: flex;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default JenisPermohonanList;