import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost:8000/api/lokasi-objek-retribusi";

const LokasiObjekRetribusiList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    axios
      .get(API)
      .then((res) => {
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`${API}/${id}`)
        .then(() => {
          setData(data.filter((item) => item.idLokasiObjekRetribusi !== id));
        })
        .catch((err) => {
          console.error("Gagal hapus:", err);
          alert("Terjadi kesalahan saat menghapus data.");
        });
    }
  };

  // Kalau mau search input dihilangkan, langsung pakai data tanpa filter:
  const filteredData = data;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Lokasi Objek Retribusi</h3>
        <Link to="/lokasiobjekretribusi/add" className="btn btn-primary">
          ➕ Tambah Data
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          ></div>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : data.length === 0 ? (
        <div className="alert alert-info text-center">
          Belum ada data. Silakan tambahkan data baru.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "30%" }}>Lokasi</th>
                  <th style={{ width: "45%" }}>Keterangan</th>
                  <th style={{ width: "20%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.idLokasiObjekRetribusi}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{item.lokasiObjekRetribusi}</td>
                      <td>{item.keterangan || "-"}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/lokasiobjekretribusi/show/${item.idLokasiObjekRetribusi}`}
                            className="btn btn-info btn-sm"
                            title="Lihat Detail"
                          >
                            👁️
                          </Link>
                          <Link
                            to={`/lokasiobjekretribusi/edit/${item.idLokasiObjekRetribusi}`}
                            className="btn btn-warning btn-sm"
                            title="Edit"
                          >
                            ✏️
                          </Link>
                          <button
                            onClick={() => handleDelete(item.idLokasiObjekRetribusi)}
                            className="btn btn-danger btn-sm"
                            title="Hapus"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-muted mt-2">
            Menampilkan {filteredData.length} dari {data.length} data
          </div>
        </>
      )}
    </div>
  );
};

export default LokasiObjekRetribusiList;
