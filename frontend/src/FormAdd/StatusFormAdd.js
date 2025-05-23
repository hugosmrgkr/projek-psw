import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatusFormAdd({ onSuccess }) {
  const [namaStatus, setNamaStatus] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [jenisStatusList, setJenisStatusList] = useState([]);
  const [idJenisStatus, setIdJenisStatus] = useState(''); // pilihannya

  useEffect(() => {
    // Ambil data jenis status dari API saat komponen mount
    const fetchJenisStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jenis-status');

        // Debug response
        console.log('Response dari API jenis-status:', response.data);

        // Cek apakah response.data adalah array, atau ada di response.data.data
        let list = [];
        if (Array.isArray(response.data)) {
          list = response.data;
        } else if (Array.isArray(response.data.data)) {
          list = response.data.data;
        } else {
          // fallback: kosongkan list jika bukan array
          console.warn('Data jenis status bukan array:', response.data);
          list = [];
        }

        setJenisStatusList(list);

        if (list.length > 0) {
          setIdJenisStatus(list[0].id); // set default pilihan pertama
        }
      } catch (error) {
        console.error('Gagal mengambil data jenis status:', error);
      }
    };

    fetchJenisStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/status', {
        namaStatus,
        keterangan,
        idJenisStatus: parseInt(idJenisStatus), // pastikan tipe number
      });
      alert('Berhasil menambahkan status!');
      onSuccess();
    } catch (error) {
      console.error('Gagal menambahkan status:', error);
      alert('Gagal menambahkan status. Coba lagi.');
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
        <h3 style={{
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
          Tambah Status
        </h3>
      </div>

      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '30px'
      }}>
        Silakan isi formulir di bawah ini untuk menambahkan status baru.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '16px'
          }}>
            Nama Status
            <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
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
          <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>
            Contoh: Aktif, Tidak Aktif, Pending
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#4b5563',
            fontWeight: '500',
            fontSize: '16px'
          }}>
            Jenis Status
            <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
          </label>
          <select
            value={idJenisStatus}
            onChange={(e) => setIdJenisStatus(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              fontSize: '16px',
              outline: 'none',
              backgroundColor: '#fff',
              cursor: 'pointer'
            }}
          >
            {Array.isArray(jenisStatusList) && jenisStatusList.map((jenis) => (
              <option key={jenis.id} value={jenis.id}>
                {jenis.namaJenisStatus || jenis.nama || jenis.keterangan || `Jenis Status ${jenis.id}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
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

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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
            Simpan Data
          </button>
          <button
            type="button"
            onClick={() => onSuccess()}
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
    </div>
  );
}

export default StatusFormAdd;
