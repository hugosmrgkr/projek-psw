import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:8000/api/tarif-objek-retribusi";

const TarifObjekRetribusiDetail = () => {
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

  if (loading) return <p>Memuat detail tarif...</p>;
  if (!detail) return <p>Data tidak ditemukan.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#4054b2" }}>Detail Tarif Objek Retribusi</h2>
        <p><strong>ID Tarif:</strong> {detail.idTarifObjekRetribusi}</p>
        <p><strong>ID Objek Retribusi:</strong> {detail.idObjekRetribusi}</p>
        <p><strong>Nama Penilai:</strong> {detail.namaPenilai}</p>
        <p><strong>Nominal Tarif:</strong> {detail.nominalTarif}</p>
        <p><strong>Tanggal Dinilai:</strong> {detail.tanggalDinilai}</p>
        <Link to="/tarifobjekretribusi" style={{
          marginTop: "20px",
          display: "inline-block",
          backgroundColor: "#4054b2",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none"
        }}>
          ← Kembali ke Daftar
        </Link>
      </div>
    </div>
  );
};

export default TarifObjekRetribusiDetail;
