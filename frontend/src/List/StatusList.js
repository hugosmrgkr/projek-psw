import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StatusList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/status');
      setData(res.data.data);
    } catch (error) {
      console.error('Gagal mengambil data status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/status/${id}`);
        fetchStatus();
      } catch (error) {
        console.error('Gagal menghapus status:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daftar Status</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/status/tambah')}
        >
          + Tambah
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nama Status</th>
              <th>Keterangan</th>
              <th style={{ minWidth: '180px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Data tidak ditemukan.
                </td>
              </tr>
            ) : (
              data.map((status) => (
                <tr key={status.idStatus}>
                  <td>{status.idStatus}</td>
                  <td>{status.namaStatus}</td>
                  <td>{status.keterangan}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => navigate(`/status/${status.idStatus}`)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/status/edit/${status.idStatus}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(status.idStatus)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatusList;
