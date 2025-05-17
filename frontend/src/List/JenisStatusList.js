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
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">
            <span className="border-start border-4 border-primary ps-3">
              Daftar Jenis Status
            </span>
          </h2>
          <Link to="/jenisstatus/add" className="btn btn-primary">
            + Tambah Data
          </Link>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Jenis Status</th>
                  <th>Keterangan</th>
                  <th style={{ minWidth: "180px" }}>Aksi</th>
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
                        <div className="btn-group" role="group" aria-label="Aksi">
                          <Link
                            to={`/edit-jenis-status/${item.idJenisStatus}`}
                            className="btn btn-warning btn-sm"
                            title="Edit"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <Link
                            to={`/jenis-status/${item.idJenisStatus}`}
                            className="btn btn-info btn-sm"
                            title="Detail"
                          >
                            <i className="bi bi-info-circle"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.idJenisStatus)}
                            title="Hapus"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-muted">
            Menampilkan {data.length} dari {data.length} data
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListJenisStatus;
