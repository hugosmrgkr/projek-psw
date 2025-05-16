import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const PermohonanSewaFormAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jenisPermohonanOptions, setJenisPermohonanOptions] = useState([]);
  const [tarifOptions, setTarifOptions] = useState([]);
  
  const [form, setForm] = useState({
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: '',
    keterangan: ''
  });

  useEffect(() => {
    // Fetch jenis permohonan options
    const fetchJenisPermohonan = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/jenis-permohonan');
        setJenisPermohonanOptions(res.data.data || []);
      } catch (error) {
        console.error('Error fetching jenis permohonan:', error);
      }
    };

    // Fetch tarif options
    const fetchTarifOptions = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/tarif-objek');
        setTarifOptions(res.data.data || []);
      } catch (error) {
        console.error('Error fetching tarif options:', error);
      }
    };

    fetchJenisPermohonan();
    fetchTarifOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/permohonan-sewa', form);
      navigate('/permohonansewa');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '10px 0',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0',
    },
    backButton: {
      backgroundColor: '#e0e0e0',
      color: '#333',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 15px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'inline-flex',
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      padding: '20px',
    },
    form: {
      width: '100%',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '14px',
      backgroundColor: 'white',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      fontSize: '14px',
      minHeight: '100px',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px',
    },
    cancelButton: {
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: '1px solid #e0e0e0',
      backgroundColor: 'white',
      color: '#333',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    submitButton: {
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#2e51a2',
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
    },
    formColumn: {
      flex: 1,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tambah Permohonan Sewa</h2>
        <Link to="/permohonansewa" style={styles.backButton}>
          Kembali
        </Link>
      </div>

      <div style={styles.card}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Jenis Permohonan</label>
                <select 
                  name="idJenisPermohonan" 
                  value={form.idJenisPermohonan}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Pilih Jenis Permohonan</option>
                  {jenisPermohonanOptions.map(option => (
                    <option key={option.idJenisPermohonan} value={option.idJenisPermohonan}>
                      {option.namaJenisPermohonan}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Nomor Surat Permohonan</label>
                <input 
                  name="nomorSuratPermohonan" 
                  placeholder="Masukkan nomor surat permohonan" 
                  value={form.nomorSuratPermohonan}
                  onChange={handleChange} 
                  style={styles.input}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Tanggal Pengajuan</label>
                <input 
                  type="date" 
                  name="tanggalPengajuan" 
                  value={form.tanggalPengajuan}
                  onChange={handleChange} 
                  style={styles.input}
                  required
                />
              </div>
            </div>
            
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nama Pemohon</label>
                <input 
                  name="namaPemohon" 
                  placeholder="Masukkan nama pemohon" 
                  value={form.namaPemohon}
                  onChange={handleChange} 
                  style={styles.input}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Alamat Pemohon</label>
                <textarea 
                  name="alamatPemohon" 
                  placeholder="Masukkan alamat lengkap pemohon" 
                  value={form.alamatPemohon}
                  onChange={handleChange}
                  style={styles.textarea}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tarif Objek Retribusi</label>
                <select 
                  name="idTarifObjekRetribusi" 
                  value={form.idTarifObjekRetribusi}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Pilih Tarif Objek</option>
                  {tarifOptions.map(option => (
                    <option key={option.idTarifObjekRetribusi} value={option.idTarifObjekRetribusi}>
                      {option.namaTarifObjek || option.deskripsi} - Rp {option.nilaiTarif?.toLocaleString('id-ID')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Keterangan</label>
                <textarea 
                  name="keterangan" 
                  placeholder="Masukkan keterangan tambahan (opsional)" 
                  value={form.keterangan}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>
              </div>
            </div>
          </div>
          
          <div style={styles.buttonsContainer}>
            <Link to="/permohonansewa">
              <button type="button" style={styles.cancelButton}>
                Batal
              </button>
            </Link>
            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                ...(loading ? styles.disabledButton : {})
              }}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermohonanSewaFormAdd;