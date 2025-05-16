import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const DetailJenisPermohonan = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setData(res.data.data); // ✅ ambil dari dalam "data"
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data. Pastikan ID valid.");
        setLoading(false);
      });
  }, [id]);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#536878',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '8px 8px 0 0',
      fontWeight: 'bold',
      fontSize: '18px',
    },
    content: {
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderTop: 'none',
      padding: '24px',
      borderRadius: '0 0 8px 8px',
    },
    label: {
      fontWeight: 'bold',
      marginTop: '16px',
      display: 'block',
      color: '#333',
    },
    value: {
      marginBottom: '12px',
    },
    backLink: {
      display: 'inline-block',
      marginTop: '20px',
      textDecoration: 'none',
      color: '#536878',
      fontWeight: 'bold',
    },
    loadingText: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '16px',
      color: '#536878',
    },
  };

  if (loading) return <p style={styles.loadingText}>Memuat detail data...</p>;
  if (!data) return <p style={styles.loadingText}>Data tidak ditemukan.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>Detail Jenis Permohonan</div>
      <div style={styles.content}>
        <div>
          <span style={styles.label}>ID:</span>
          <div style={styles.value}>{data.id}</div>

          <span style={styles.label}>Jenis Permohonan:</span>
          <div style={styles.value}>{data.jenisPermohonan}</div>

          <span style={styles.label}>Parent ID:</span>
          <div style={styles.value}>{data.parentId ?? '-'}</div>

          <span style={styles.label}>Keterangan:</span>
          <div style={styles.value}>{data.keterangan}</div>

          <span style={styles.label}>Dibuat pada:</span>
          <div style={styles.value}>{new Date(data.created_at).toLocaleString()}</div>

          <span style={styles.label}>Terakhir diupdate:</span>
          <div style={styles.value}>{new Date(data.updated_at).toLocaleString()}</div>
        </div>

        <Link to="/" style={styles.backLink}>← Kembali ke Daftar</Link>
      </div>
    </div>
  );
};

export default DetailJenisPermohonan;
