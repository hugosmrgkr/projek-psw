import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DetailJangkaWaktuSewa = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/jangka-waktu-sewa/${id}`);
      setDetail(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal memuat detail:", err);
      setError("Data tidak ditemukan atau terjadi kesalahan.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '500', margin: '20px 0' }}>Detail Jangka Waktu Sewa</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p>Memuat detail data...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '16px' }}>
            <strong>Jangka Waktu Sewa:</strong>
            <p>{detail.jangkaWaktuSewa}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <strong>Keterangan:</strong>
            <p>{detail.keterangan || '-'}</p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <strong>Default:</strong>
            <p>{detail.isDefault ? 'Ya' : 'Tidak'}</p>
          </div>
          <Link to="/JangkaWaktuSewa" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#3f50b5', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 16px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              Kembali
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetailJangkaWaktuSewa;
