import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListObjekRetribusi() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    <div>
      <h3>Daftar Objek Retribusi</h3>
      <button onClick={() => navigate('/objekretribusi/tambah')}>+ Tambah</button>
      <table border="1" cellPadding="8" style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>No Bangunan</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.kodeObjekRetribusi}</td>
              <td>{item.objekRetribusi}</td>
              <td>{item.noBangunan}</td>
              <td>{item.alamat}</td>
              <td>
                <button onClick={() => navigate(`/objekretribusi/show/${item.id}`)}>Detail</button>{' '}
                <button onClick={() => navigate(`/objekretribusi/edit/${item.id}`)}>Edit</button>{' '}
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListObjekRetribusi;
