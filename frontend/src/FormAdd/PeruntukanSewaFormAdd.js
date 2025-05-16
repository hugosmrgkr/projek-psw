import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PeruntukanSewaFormAdd() {
  const [jenisKegiatan, setJenisKegiatan] = useState('');
  const [peruntukanSewa, setPeruntukanSewa] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/peruntukan-sewa', {
        jenisKegiatan,
        peruntukanSewa,
        keterangan
      });
      alert('Berhasil menambahkan data!');
      navigate('/peruntukan-sewa');
    } catch (err) {
      console.error('Gagal menambahkan data:', err);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      borderLeft: '5px solid #3949AB',
      paddingLeft: '15px',
    },
    title: {
      margin: '0',
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    formContainer: {
      paddingBottom: '30px',
    },
    instruction: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '25px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      color: '#333',
      fontSize: '16px',
      fontWeight: '500',
    },
    requiredLabel: {
      color: 'red',
      marginLeft: '5px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '12px 15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    helperText: {
      color: '#666',
      fontSize: '12px',
      marginTop: '5px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    saveIcon: {
      marginRight: '8px',
      fontSize: '18px',
    },
    cancelButton: {
      backgroundColor: '#f4f4f4',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '12px 20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    cancelIcon: {
      marginRight: '8px',
      fontSize: '18px',
      color: '#666',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tambah Peruntukan Sewa</h2>
      </div>
      
      <div style={styles.formContainer}>
        <p style={styles.instruction}>
          Silakan isi formulir di bawah ini untuk menambahkan peruntukan sewa baru.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Jenis Kegiatan
              <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan jenis kegiatan"
              value={jenisKegiatan}
              onChange={(e) => setJenisKegiatan(e.target.value)}
              required
              style={styles.input}
            />
            <div style={styles.helperText}>
              Contoh: Seminar, Workshop, Rapat
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Peruntukan Sewa
              <span style={styles.requiredLabel}>*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan peruntukan sewa"
              value={peruntukanSewa}
              onChange={(e) => setPeruntukanSewa(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Keterangan
            </label>
            <textarea
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              style={styles.textarea}
            />
          </div>
          
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>
              <span style={styles.saveIcon}>💾</span>
              Simpan Data
            </button>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={() => navigate('/peruntukan-sewa')}
            >
              <span style={styles.cancelIcon}>✖</span>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeruntukanSewaFormAdd;