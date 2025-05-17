import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListObjekRetribusi() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/objek-retribusi');
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
        await axios.delete(`http://localhost:8000/api/objek-retribusi/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Daftar Objek Retribusi</h3>

      <Link to="/objekretribusi/create" className="btn btn-primary mb-3">
        + Tambah
      </Link>

      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center align-middle">
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>No Bangunan</th>
            <th>Alamat</th>
            <th style={{ minWidth: '170px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Data tidak tersedia
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td className="text-center">{item.kodeObjekRetribusi}</td>
                <td>{item.objekRetribusi}</td>
                <td className="text-center">{item.noBangunan}</td>
                <td>{item.alamat}</td>
                <td className="text-center">
                  <Link
                    to={`/objekretribusi/show/${item.id}`}
                    className="btn btn-sm btn-info me-2"
                    title="Detail"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/objekretribusi/edit/${item.id}`}
                    className="btn btn-sm btn-warning me-2"
                    title="Edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-danger"
                    title="Hapus"
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
  );
}

export default ListObjekRetribusi;
