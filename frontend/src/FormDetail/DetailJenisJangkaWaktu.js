import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DetailJenisJangkaWaktu = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/jenis-jangka-waktu/${id}`);
      setDetail(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal memuat detail:", err);
      setError("Data tidak ditemukan atau terjadi kesalahan.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  // Fungsi bantu untuk memformat tanggal (misalnya: 14 Mei 2025 08:30)
  const formatTanggal = (tanggal) => {
    const opsi = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(tanggal).toLocaleDateString("id-ID", opsi);
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h3 className="mb-4">Detail Jenis Jangka Waktu</h3>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Memuat detail data...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-3">
              <strong>Jenis Jangka Waktu:</strong>
              <p className="mb-0">{detail.jenisJangkaWaktu}</p>
            </div>
            <div className="mb-3">
              <strong>Keterangan:</strong>
              <p className="mb-0">{detail.keterangan || "-"}</p>
            </div>
            <div className="mb-3">
              <strong>Dibuat pada:</strong>
              <p className="mb-0">{formatTanggal(detail.created_At)}</p>
            </div>
            <div className="mb-3">
              <strong>Terakhir diubah:</strong>
              <p className="mb-0">{formatTanggal(detail.updated_At)}</p>
            </div>
          </div>
          <div className="card-footer bg-white text-end">
            <Link to="/JenisJangkaWaktu" className="btn btn-secondary">
              ← Kembali
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailJenisJangkaWaktu;
