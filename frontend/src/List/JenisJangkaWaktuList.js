import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DaftarJenisJangkaWaktu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/jenis-jangka-waktu");
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data. Silakan coba lagi.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/jenis-jangka-waktu/${id}`);
        alert("Data berhasil dihapus");
        getData();
      } catch (err) {
        console.error("Error deleting data:", err);
        alert("Gagal menghapus data. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Jenis Jangka Waktu</h2>
        <Link to="/JenisJangkaWaktu/tambah" className="btn btn-primary">
          ➕ Tambah Jenis
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 mb-0">Memuat data...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="p-4 text-center text-muted">
              Belum ada data jenis jangka waktu.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }} className="text-center">No</th>
                    <th>Jenis Jangka Waktu</th>
                    <th>Keterangan</th>
                    <th style={{ width: "25%" }} className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.idJenisJangkaWaktu}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="align-middle">{item.jenisJangkaWaktu}</td>
                      <td className="align-middle">{item.keterangan || "-"}</td>
                      <td className="text-center align-middle">
                        <div className="btn-group" role="group" aria-label="Aksi">
                          <Link
                            to={`/JenisJangkaWaktu/detail/${item.idJenisJangkaWaktu}`}
                            className="btn btn-info btn-sm"
                            title="Detail"
                          >
                            🔍 Detail
                          </Link>
                          <Link
                            to={`/JenisJangkaWaktu/edit/${item.idJenisJangkaWaktu}`}
                            className="btn btn-warning btn-sm"
                            title="Edit"
                          >
                            ✏️ Edit
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Hapus"
                            onClick={() => handleDelete(item.idJenisJangkaWaktu)}
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarJenisJangkaWaktu;
