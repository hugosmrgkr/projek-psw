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
        setPosts(res.data.data || []);
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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Data Jenis Permohonan</h2>
        <Link to="/jenispermohonan/tambah" className="btn btn-primary">
          + Tambah Data
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status" />
          <span className="ms-2">Memuat data...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="alert alert-info">Belum ada data jenis permohonan.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "60px" }} className="text-center">#</th>
                <th>Jenis Permohonan</th>
                <th style={{ width: "180px" }} className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.jenisPermohonan}</td>
                  <td className="text-center">
                    <Link
                      to={`/JenisPermohonan/edit/${item.id}`}
                      className="btn btn-sm btn-warning text-white me-1"
                      title="Edit Data"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-danger"
                      title="Hapus Data"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JenisPermohonanList;
