import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const JenisPermohonanList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setPosts((prevPosts) => prevPosts.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error("Gagal menghapus data:", err);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Daftar Jenis Permohonan</h2>
        <Link to="/jenispermohonan/tambah" className="btn btn-primary">
          + Tambah Data
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
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
                <th className="text-center" style={{ width: "60px" }}>#</th>
                <th>Jenis Permohonan</th>
                <th className="text-center" style={{ width: "180px" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.jenisPermohonan}</td>
                  <td className="text-center">
                    <Link
                      to={`/jenispermohonan/edit/${item.id}`}
                      className="btn btn-sm btn-warning text-white me-2"
                      title="Edit Data"
                    >
                      <i className="bi bi-pencil-square"></i>
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
