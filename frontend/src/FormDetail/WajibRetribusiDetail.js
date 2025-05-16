import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WajibRetribusiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/wajib-retribusi/${id}`);
        setDetail(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil data detail:', err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!detail) {
    return <p style={{ padding: '20px' }}>Memuat data...</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ borderLeft: '5px solid #3949AB', paddingLeft: '10px' }}>Detail Wajib Retribusi</h2>
      <div style={{ background: '#f9f9f9', padding: '20px', marginTop: '20px', borderRadius: '4px' }}>
        <p><strong>NIK:</strong> {detail.NIK}</p>
        <p><strong>Nama:</strong> {detail.namaWajibRetribusi}</p>
        <p><strong>Pekerjaan:</strong> {detail.pekerjaan}</p>
        <p><strong>Alamat:</strong> {detail.alamat}</p>
        <p><strong>Status:</strong> {detail.status}</p>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginTop: '20px', padding: '8px 12px', background: '#3949AB', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default WajibRetribusiDetail;
