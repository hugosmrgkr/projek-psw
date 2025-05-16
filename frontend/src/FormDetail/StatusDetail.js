import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StatusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/status/${id}`);
        setData(res.data.data);
      } catch (error) {
        console.error('Gagal mengambil detail status:', error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!data) {
    return <p style={{ padding: '20px' }}>Memuat data...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ borderLeft: '5px solid #3949AB', paddingLeft: '10px' }}>Detail Status</h2>
      <div style={{ background: '#f9f9f9', padding: '20px', marginTop: '20px', borderRadius: '4px' }}>
        <p><strong>ID:</strong> {data.idStatus}</p>
        <p><strong>Nama Status:</strong> {data.namaStatus}</p>
        <p><strong>Keterangan:</strong> {data.keterangan}</p>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginTop: '20px', padding: '8px 12px', background: '#3949AB', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default StatusDetail;
