import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JenisStatusAPI from '../../api/JenisStatus';

const ListJenisStatus = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await JenisStatusAPI.getAll();
      setItems(data);
    } catch (err) {
      setError('Gagal memuat data.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await JenisStatusAPI.remove(id);
        fetchData(); // refresh data
      } catch (err) {
        alert('Gagal menghapus data.');
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Daftar Jenis Status</h3>
        <Link to="/jenis-status/create" className="btn btn-primary">Tambah Baru</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.idJenisStatus}>
                <td>{index + 1}</td>
                <td>{item.jenisStatus}</td>
                <td>{item.keterangan}</td>
                <td>
                  <Link to={`/jenis-status/edit/${item.idJenisStatus}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.idJenisStatus)} className="btn btn-sm btn-danger">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Data tidak tersedia.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListJenisStatus;
