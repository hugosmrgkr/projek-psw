import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-status";

const ListJenisStatus = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(API)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error("Gagal menghapus:", err));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <style>{`
        /* Container utama */
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Style untuk card container */
        .card-container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        /* Header card */
        .card-header {
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
        }

        /* Container judul dengan garis biru di sebelah kiri */
        .title-container {
          display: flex;
          align-items: center;
        }

        /* Garis biru vertikal */
        .blue-line {
          width: 4px;
          height: 24px;
          background-color: #3f51b5;
          margin-right: 12px;
          border-radius: 2px;
        }

        /* Style untuk judul */
        .title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        /* Tombol tambah data */
        .add-button {
          background-color: #3f51b5;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: background-color 0.3s;
        }

        .add-button:hover {
          background-color: #303f9f;
          text-decoration: none;
          color: white;
        }

        /* Ikon plus pada tombol tambah */
        .plus-icon {
          font-size: 16px;
          margin-right: 6px;
        }

        /* Body card */
        .card-body {
          padding: 20px;
        }

        /* Style untuk tabel */
        .data-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
        }

        /* Style untuk header tabel */
        .data-table thead th {
          background-color: #f5f5f5;
          color: #333;
          font-weight: 600;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        /* Style untuk baris tabel */
        .data-table tbody tr {
          border-bottom: 1px solid #eee;
        }

        .data-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        /* Style untuk sel tabel */
        .data-table td {
          padding: 12px 16px;
          font-size: 14px;
          color: #555;
        }

        /* Container untuk tombol aksi */
        .action-buttons {
          display: flex;
          gap: 8px;
        }

        /* Tombol edit */
        .edit-button {
          background-color: #ff9800;
          color: white;
          border: none;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .edit-button:hover {
          background-color: #f57c00;
        }

        /* Ikon edit (pensil) */
        .edit-icon::before {
          content: "✎";
          font-size: 16px;
        }

        /* Tombol hapus */
        .delete-button {
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .delete-button:hover {
          background-color: #d32f2f;
        }

        /* Ikon hapus (sampah) */
        .delete-icon::before {
          content: "🗑";
          font-size: 16px;
        }

        /* Informasi pagination di bagian bawah */
        .pagination-info {
          text-align: right;
          margin-top: 16px;
          font-size: 14px;
          color: #666;
        }
          /* Tombol detail */
.detail-button {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.detail-button:hover {
  background-color: #1976d2;
}

/* Ikon detail (mata) */
.detail-icon::before {
  content: "👁";
  font-size: 16px;
}

      `}</style>
      <div className="container">
        <div className="card-container">
          <div className="card-header">
            <div className="title-container">
              <div className="blue-line"></div>
              <h2 className="title">Daftar Jenis Status</h2>
            </div>
            <Link to="/jenisstatus/add" className="add-button">
              <span className="plus-icon">+</span> Tambah Data
            </Link>
          </div>
          <div className="card-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Jenis Status</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.idJenisStatus}>
                      <td>{item.idJenisStatus}</td>
                      <td>{item.jenisStatus}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/edit-jenis-status/${item.idJenisStatus}`} className="edit-button">
                            <span className="edit-icon"></span>
                          </Link>
                          <Link to={`/jenis-status/${item.idJenisStatus}`} className="detail-button">
                            <span className="detail-icon"></span>
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(item.idJenisStatus)}
                          >
                            <span className="delete-icon"></span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination-info">
              Menampilkan {data.length} dari {data.length} data
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListJenisStatus;