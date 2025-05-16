import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8000/api/lokasi-objek-retribusi";

const LokasiObjekRetribusiDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/${id}`)
      .then((res) => {
        setDetail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mt-4"><p>Memuat detail...</p></div>;
  }

  if (!detail) {
    return <div className="container mt-4"><p>Data tidak ditemukan.</p></div>;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="mb-3">Detail Lokasi Objek Retribusi</h3>
        <p><strong>ID:</strong> {detail.idLokasiObjekRetribusi}</p>
        <p><strong>Lokasi:</strong> {detail.lokasiObjekRetribusi}</p>
        <p><strong>Keterangan:</strong> {detail.keterangan || '-'}</p>

        <Link to="/lokasiobjekretribusi" className="btn btn-secondary mt-3">
          ← Kembali ke Daftar
        </Link>
      </div>
    </div>
  );
};

export default LokasiObjekRetribusiDetail;
