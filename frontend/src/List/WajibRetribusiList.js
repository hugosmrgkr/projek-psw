import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WajibRetribusiList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/wajib-retribusi');
      setData(res.data.data);
    } catch (error) {
      console.error('Gagal mengambil data wajib retribusi:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus data ini?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/api/wajib-retribusi/${id}`);
      alert('Data berhasil dihapus');
      fetchData(); // Refresh data setelah delete
    } catch (error) {
      alert('Gagal menghapus data');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="border-start border-4 border-primary ps-3 mb-0">
          Daftar Wajib Retribusi
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/wajibretribusi/tambah')}
        >
          + Tambah
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col">NIK</th>
              <th scope="col">Nama</th>
              <th scope="col">Alamat</th>
              <th scope="col" style={{ minWidth: '140px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.idWajibRetribusi}>
                  <td>{item.NIK}</td>
                  <td>{item.namaWajibRetribusi}</td>
                  <td>{item.alamat}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Aksi">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        title="Lihat Detail"
                        onClick={() => navigate(`/wajibretribusi/show/${item.idWajibRetribusi}`)}
                      >
                        👁️
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        title="Edit"
                        onClick={() => navigate(`/wajibretribusi/edit/${item.idWajibRetribusi}`)}
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        title="Hapus"
                        onClick={() => handleDelete(item.idWajibRetribusi)}
                      >
                        🗑️
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
    </div>
  );
}

export default WajibRetribusiList;
