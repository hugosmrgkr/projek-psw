import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PeruntukanSewaList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/peruntukan-sewa');
      setData(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/peruntukan-sewa/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="border-start border-4 border-primary ps-3 mb-0">Daftar Peruntukan Sewa</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate('/peruntukansewa/add')}
        >
          <span className="me-2 fs-4">+</span> Tambah Data
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Jenis Kegiatan</th>
              <th>Peruntukan</th>
              <th>Keterangan</th>
              <th style={{ minWidth: "200px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.idPeruntukanSewa}>
                  <td>{item.jenisKegiatan}</td>
                  <td>{item.peruntukanSewa}</td>
                  <td>{item.keterangan}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Aksi">
                      <button
                        type="button"
                        className="btn btn-info btn-sm"
                        onClick={() => navigate(`/peruntukansewa/${item.idPeruntukanSewa}`)}
                        title="Detail"
                      >
                        Detail
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/peruntukansewa/edit/${item.idPeruntukanSewa}`)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.idPeruntukanSewa)}
                        title="Hapus"
                      >
                        Hapus
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

      {data.length > 0 && (
        <div className="text-muted mt-3">
          Menampilkan {data.length} dari {data.length} data
        </div>
      )}
    </div>
  );
}

export default PeruntukanSewaList;
