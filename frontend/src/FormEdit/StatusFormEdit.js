import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function StatusFormEdit() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [namaStatus, setNamaStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/api/status/${id}`);
        const data = res.data.data;
        setNamaStatus(data.namaStatus);
        setKeterangan(data.keterangan || '');
      } catch (err) {
        console.error('Gagal mengambil detail status:', err);
        alert('Status tidak ditemukan!');
        navigate('/status'); // Redirect ke daftar status jika gagal
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStatus();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/status/${id}`, {
        namaStatus,
        keterangan,
        idJenisStatus: 1 // Ganti jika kamu pakai pilihan dinamis
      });
      alert('Berhasil mengubah status!');
      navigate('/status');
    } catch (error) {
      console.error('Gagal mengedit status:', error);
      alert('Gagal mengedit status!');
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '15px',
        marginBottom: '20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          color: '#333',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingLeft: '15px'
        }}>
          <span style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '4px',
            height: '100%',
            backgroundColor: '#4f46e5',
            borderRadius: '2px'
          }}></span>
          Edit Status
        </h2>
      </div>
      
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '30px'
      }}>
        Silakan ubah data status pada formulir di bawah ini.
      </p>
      
      {loading ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          Memuat data...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{
            marginBottom: '20px'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4b5563',
              fontWeight: '500',
              fontSize: '16px'
            }}>
              Nama Status
              <span style={{
                color: '#ef4444',
                marginLeft: '4px'
              }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan nama status"
              value={namaStatus}
              onChange={(e) => setNamaStatus(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                transition: 'border-color 0.15s ease-in-out',
                outline: 'none'
              }}
            />
            <div style={{
              fontSize: '14px',
              color: '#6b7280',
              marginTop: '6px'
            }}>
              Contoh: Aktif, Tidak Aktif, Pending
            </div>
          </div>
          
          <div style={{
            marginBottom: '20px'
          }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4b5563',
              fontWeight: '500',
              fontSize: '16px'
            }}>
              Keterangan
            </label>
            <textarea
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                fontSize: '16px',
                minHeight: '100px',
                resize: 'vertical',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button 
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: '#4ade80',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ marginRight: '8px', fontSize: '18px' }}>💾</span>
              Update Data
            </button>
            <button 
              type="button"
              onClick={() => navigate('/status')}
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                backgroundColor: '#f3f4f6',
                color: '#4b5563',
                border: '1px solid #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ marginRight: '8px', fontSize: '18px' }}>✖️</span>
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StatusFormEdit;