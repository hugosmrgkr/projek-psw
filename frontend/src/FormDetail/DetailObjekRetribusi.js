import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8000/api/objek-retribusi";

const ObjekRetribusiDetail = () => {
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

  if (loading) return <p>Memuat detail...</p>;
  if (!detail) return <p>Data tidak ditemukan.</p>;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="mb-3">Detail Objek Retribusi</h3>
        <p><strong>ID:</strong> {detail.id}</p>
        <p><strong>Kode:</strong> {detail.kodeObjekRetribusi}</p>
        <p><strong>Nama:</strong> {detail.objekRetribusi}</p>
        <p><strong>No Bangunan:</strong> {detail.noBangunan}</p>
        <p><strong>Alamat:</strong> {detail.alamat}</p>
        <Link to="/objekretribusi" className="btn btn-secondary mt-3">
          ← Kembali ke Daftar
        </Link>
      </div>
    </div>
  );
};

export default ObjekRetribusiDetail;
