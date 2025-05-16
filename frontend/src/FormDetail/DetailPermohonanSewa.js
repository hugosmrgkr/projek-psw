import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DetailPermohonanSewa = () => {
  const { id } = useParams(); // ambil id dari URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/permohonan-sewa/${id}`);
      setData(res.data.data); // karena kamu pakai Resource di Laravel
      setLoading(false);
    } catch (error) {
      console.error('Gagal memuat data:', error);
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#2e51a2',
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
      color: '#2e51a2',
      fontWeight: 'bold',
    },
    loadingText: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '16px',
      color: '#2e51a2',
    },
  };

  if (loading) return <p style={styles.loadingText}>Memuat detail data...</p>;
  if (!data) return <p style={styles.loadingText}>Data tidak ditemukan.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>Detail Permohonan Sewa</div>
      <div style={styles.content}>
        <div>
          <span style={styles.label}>Nomor Surat Permohonan:</span>
          <div style={styles.value}>{data.nomorSuratPermohonan}</div>

          <span style={styles.label}>Nama Pemohon:</span>
          <div style={styles.value}>{data.namaPemohon}</div>

          <span style={styles.label}>Tanggal Permohonan:</span>
          <div style={styles.value}>
            {new Date(data.tanggalPermohonan).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </div>

          <span style={styles.label}>Status:</span>
          <div style={styles.value}>{data.status || 'Menunggu'}</div>

          <span style={styles.label}>Keterangan:</span>
          <div style={styles.value}>{data.keterangan || '-'}</div>

          <span style={styles.label}>Dibuat Pada:</span>
          <div style={styles.value}>
            {new Date(data.created_at).toLocaleString()}
          </div>
        </div>

        <Link to="/permohonansewa" style={styles.backLink}>← Kembali ke Daftar</Link>
      </div>
    </div>
  );
};

export default DetailPermohonanSewa;
