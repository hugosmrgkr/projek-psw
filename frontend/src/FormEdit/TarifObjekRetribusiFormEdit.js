// src/pages/TarifObjekRetribusi/TarifEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TarifObjekRetribusiFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/tarif-objek-retribusi/${id}`);
        setForm(response.data.data);
        setError(null);
      } catch (error) {
        console.error('Gagal memuat data:', error);
        setError('Data tidak ditemukan atau server tidak merespon.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/tarif-objek-retribusi/${id}`, form);
      alert('Data berhasil diperbarui.');
      navigate('/tarif');
    } catch (error) {
      console.error('Gagal memperbarui data:', error);
      alert('Terjadi kesalahan saat memperbarui data.');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <Link to="/tarif" style={styles.backLink}>Kembali ke daftar</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.headerTitle}>
          <div style={styles.blueBar}></div>
          <h2 style={styles.heading}>Edit Tarif Objek Retribusi</h2>
        </div>
      </div>
      
      <p style={styles.instructions}>
        Silakan edit formulir di bawah ini untuk memperbarui tarif objek retribusi.
      </p>
      
      <div style={styles.divider}></div>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Objek Retribusi <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="idObjekRetribusi"
            value={form.idObjekRetribusi}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.helperText}>Contoh: Kios Pasar, Parkir Mall, Terminal Bus</div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Jenis Jangka Waktu <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="idJenisJangkaWaktu"
            value={form.idJenisJangkaWaktu}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.helperText}>Contoh: Harian, Bulanan, Tahunan</div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Tanggal Dinilai <span style={styles.required}>*</span>
          </label>
          <input
            type="date"
            name="tanggalDinilai"
            value={form.tanggalDinilai}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nama Penilai <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="namaPenilai"
            value={form.namaPenilai}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nominal Tarif <span style={styles.required}>*</span>
          </label>
          <input
            type="number"
            name="nominalTarif"
            value={form.nominalTarif}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.helperText}>Dalam satuan Rupiah (Rp)</div>
        </div>
        
        <div style={styles.formActions}>
          <button type="submit" style={styles.updateButton}>
            <span style={styles.updateIcon}>✓</span> Update
          </button>
          <Link to="/tarif" style={styles.cancelButton}>
            <span style={styles.cancelIcon}>✖</span> Batal
          </Link>
        </div>
      </form>
    </div>
  );
};

// Embedded styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  blueBar: {
    width: '4px',
    height: '32px',
    backgroundColor: '#4054b2',
    marginRight: '15px',
    borderRadius: '2px',
  },
  heading: {
    color: '#333',
    fontSize: '24px',
    margin: '0',
  },
  instructions: {
    color: '#666',
    margin: '0 0 20px 0',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '20px 0',
  },
  form: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#333',
  },
  required: {
    color: '#d32f2f',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  helperText: {
    fontSize: '12px',
    color: '#777',
    marginTop: '5px',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  updateButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  updateIcon: {
    marginRight: '8px',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  cancelIcon: {
    marginRight: '8px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '16px',
    color: '#666',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '15px',
    color: '#4054b2',
    textDecoration: 'none',
  }
};

export default TarifObjekRetribusiFormEdit;