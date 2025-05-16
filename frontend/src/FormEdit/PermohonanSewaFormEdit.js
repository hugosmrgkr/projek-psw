import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PermohonanSewaFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [jenisPermohonanOptions, setJenisPermohonanOptions] = useState([]);
  const [tarifOptions, setTarifOptions] = useState([]);
  const [error, setError] = useState(null);
  
  const [form, setForm] = useState({
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: '',
    keterangan: '',
    status: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch permohonan data
        const permohonanRes = await axios.get(`http://localhost:8000/api/permohonan-sewa/${id}`);
        
        // Format the date for proper display in the date input
        const permohonanData = permohonanRes.data.data;
        if (permohonanData.tanggalPengajuan) {
          const date = new Date(permohonanData.tanggalPengajuan);
          if (!isNaN(date.getTime())) {
            permohonanData.tanggalPengajuan = date.toISOString().split('T')[0];
          }
        }
        
        setForm(permohonanData);

        // Fetch jenis permohonan options
        const jenisRes = await axios.get('http://localhost:8000/api/jenis-permohonan');
        setJenisPermohonanOptions(jenisRes.data.data || []);

        // Fetch tarif options
        const tarifRes = await axios.get('http://localhost:8000/api/tarif-objek');
        setTarifOptions(tarifRes.data.data || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal memuat data. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`http://localhost:8000/api/permohonan-sewa/${id}`, form);
      navigate('/permohonansewa');
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Gagal memperbarui data. Silakan coba lagi.');
      setSubmitting(false);
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
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
    },
    errorMessage: {
      backgroundColor: '#FEEBEE',
      color: '#F44336',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '14px',
    },
    statusSection: {
      borderTop: '1px solid #e0e0e0',
      marginTop: '20px',
      paddingTop: '20px',
    },
    statusTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Edit Permohonan Sewa</h2>
          <Link to="/permohonansewa" style={styles.backButton}>
            Kembali
          </Link>
        </div>
        <div style={styles.card}>
          <div style={styles.loadingContainer}>
            <p>Memuat data permohonan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Edit Permohonan Sewa</h2>
        <Link to="/permohonansewa" style={styles.backButton}>
          Kembali
        </Link>
      </div>

      <div style={styles.card}>
        {error && <div style={styles.errorMessage}>{error}</div>}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.formColumn}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Jenis Permohonan</label>
                <select 
                  name="idJenisPermohonan" 
                  value={form.idJenisPermohonan || ''}
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
                  value={form.nomorSuratPermohonan || ''}
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
                  value={form.tanggalPengajuan || ''}
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
                  value={form.namaPemohon || ''}
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
                  value={form.alamatPemohon || ''}
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
                  value={form.idTarifObjekRetribusi || ''}
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
                  value={form.keterangan || ''}
                  onChange={handleChange}
                  style={styles.textarea}
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Status section - only visible in edit mode */}
          <div style={styles.statusSection}>
            <h3 style={styles.statusTitle}>Status Permohonan</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select 
                name="status" 
                value={form.status || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Pilih Status</option>
                <option value="menunggu">Menunggu</option>
                <option value="diproses">Diproses</option>
                <option value="disetujui">Disetujui</option>
                <option value="ditolak">Ditolak</option>
              </select>
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
                ...(submitting ? styles.disabledButton : {})
              }}
              disabled={submitting}
            >
              {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermohonanSewaFormEdit;