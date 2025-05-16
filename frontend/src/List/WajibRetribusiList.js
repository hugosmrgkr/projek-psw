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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ borderLeft: '5px solid #2a3c85', paddingLeft: '10px' }}>Daftar Wajib Retribusi</h2>
        <button
          onClick={() => navigate('/wajibretribusi/tambah')}
          style={{ padding: '8px 16px', background: '#2a3c85', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          + Tambah
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#2a3c85', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>NIK</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Nama</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Alamat</th>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.idWajibRetribusi}>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.NIK}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.namaWajibRetribusi}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.alamat}</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                <button
                  onClick={() => navigate(`/wajibretribusi/show/${item.idWajibRetribusi}`)}
                  style={{ marginRight: '5px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  👁️
                </button>
                <button
                  onClick={() => navigate(`/wajibretribusi/edit/${item.idWajibRetribusi}`)}
                  style={{ marginRight: '5px', background: '#fbc02d', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item.idWajibRetribusi)}
                  style={{ background: '#e53935', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WajibRetribusiList;
