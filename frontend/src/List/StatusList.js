import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StatusList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // tambahkan ini

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
    <div>
      <h2>Daftar Status</h2>
      <button onClick={() => navigate('/status/tambah')}>+ Tambah</button>
      <table border="1" cellPadding="8" style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((status) => (
            <tr key={status.idStatus}>
              <td>{status.idStatus}</td>
              <td>{status.namaStatus}</td>
              <td>{status.keterangan}</td>
              <td>
                <button onClick={() => navigate(`/status/${status.idStatus}`)}>Detail</button>{' '}
                <button onClick={() => navigate(`/status/edit/${status.idStatus}`)}>Edit</button>{' '}
                <button onClick={() => handleDelete(status.idStatus)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatusList;
