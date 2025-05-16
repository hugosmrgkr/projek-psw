import React, { useState } from 'react';
import axios from 'axios';

const WajibRetribusiFormAdd = ({ onClose }) => {
  const [form, setForm] = useState({
    NIK: '',
    namaWajibRetribusi: '',
    pekerjaan: '',
    alamat: '',
    nomorPonsel: '',
    nomorWhatsapp: '',
    email: '',
    idJenisRetribusi: '',
    fileFoto: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/wajib-retribusi', form);
      alert('Data berhasil ditambahkan.');
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data.");
    }
  };

  const styles = {
    formContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    },
    header: {
      color: '#034C84',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      borderLeft: '4px solid #4B7BEC',
      paddingLeft: '12px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#495057'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '4px',
      border: '1px solid #DFE4EA',
      fontSize: '14px',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '4px',
      border: '1px solid #DFE4EA',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: 'inherit',
      outline: 'none'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '24px',
      gap: '12px'
    },
    saveButton: {
      backgroundColor: '#4B7BEC',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s'
    },
    cancelButton: {
      backgroundColor: '#F1F2F6',
      color: '#57606F',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    iconSave: {
      marginRight: '8px'
    },
    iconCancel: {
      marginRight: '8px'
    },
    required: {
      color: '#ED4C67',
      marginLeft: '4px'
    },
    formTitle: {
      fontSize: '18px',
      color: '#2F3542',
      marginBottom: '24px',
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.header}>Tambah Wajib Retribusi</h3>
      <p style={styles.formTitle}>Silakan isi formulir di bawah ini untuk menambahkan wajib retribusi baru.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            NIK <span style={styles.required}>*</span>
          </label>
          <input 
            style={styles.input}
            name="NIK" 
            placeholder="Masukkan NIK" 
            value={form.NIK} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Nama Wajib Retribusi <span style={styles.required}>*</span>
          </label>
          <input 
            style={styles.input}
            name="namaWajibRetribusi" 
            placeholder="Masukkan nama lengkap" 
            value={form.namaWajibRetribusi} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Pekerjaan <span style={styles.required}>*</span>
          </label>
          <input 
            style={styles.input}
            name="pekerjaan" 
            placeholder="Masukkan pekerjaan" 
            value={form.pekerjaan} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Alamat <span style={styles.required}>*</span>
          </label>
          <textarea 
            style={styles.textarea}
            name="alamat" 
            placeholder="Masukkan alamat lengkap" 
            value={form.alamat} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Nomor Ponsel</label>
          <input 
            style={styles.input}
            name="nomorPonsel" 
            placeholder="Masukkan nomor ponsel" 
            value={form.nomorPonsel} 
            onChange={handleChange} 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Nomor WhatsApp</label>
          <input 
            style={styles.input}
            name="nomorWhatsapp" 
            placeholder="Masukkan nomor WhatsApp" 
            value={form.nomorWhatsapp} 
            onChange={handleChange} 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input 
            style={styles.input}
            name="email" 
            type="email"
            placeholder="Masukkan alamat email" 
            value={form.email} 
            onChange={handleChange} 
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            ID Jenis Retribusi <span style={styles.required}>*</span>
          </label>
          <input 
            style={styles.input}
            name="idJenisRetribusi" 
            placeholder="Masukkan ID jenis retribusi" 
            value={form.idJenisRetribusi} 
            onChange={handleChange} 
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Link Foto</label>
          <input 
            style={styles.input}
            name="fileFoto" 
            placeholder="Masukkan link foto" 
            value={form.fileFoto} 
            onChange={handleChange} 
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button type="button" style={styles.cancelButton} onClick={onClose}>
            <span style={styles.iconCancel}>✖</span> Batal
          </button>
          <button type="submit" style={styles.saveButton}>
            <span style={styles.iconSave}>💾</span> Simpan Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default WajibRetribusiFormAdd;