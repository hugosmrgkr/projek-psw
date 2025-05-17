import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JenisObjekRetribusiList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/jenis-objek-retribusi")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios
        .delete(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
        .then(() => fetchData())
        .catch(() => alert("Gagal hapus data."));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daftar Jenis Objek Retribusi</h2>
        <Link to="/jenisobjekretribusi/create" className="btn btn-primary">
          ➕ Tambah Data
        </Link>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "30%" }}>Jenis Objek</th>
                  <th style={{ width: "45%" }}>Keterangan</th>
                  <th style={{ width: "20%" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  data.map((item, i) => (
                    <tr key={item.idJenisObjekRetribusi}>
                      <td>{i + 1}</td>
                      <td className="fw-semibold">{item.jenisObjekRetribusi}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/jenisobjekretribusi/detail/${item.idJenisObjekRetribusi}`}
                            className="btn btn-sm btn-primary"
                            title="Lihat Detail"
                          >
                            👁️
                          </Link>
                          <Link
                            to={`/jenisobjekretribusi/edit/${item.idJenisObjekRetribusi}`}
                            className="btn btn-sm btn-warning"
                            title="Edit Data"
                          >
                            ✏️
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.idJenisObjekRetribusi)}
                            title="Hapus Data"
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

          <div className="mt-2 text-muted">
            Menampilkan {data.length} data
          </div>
        </>
      )}
    </div>
  );
};

export default JenisObjekRetribusiList;
