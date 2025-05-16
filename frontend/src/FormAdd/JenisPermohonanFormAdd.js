import React, { useState, useEffect } from "react";

const CreatePostForm = () => {
  const [form, setForm] = useState({ 
    jenisPermohonan: "", 
    parentId: "", 
    keterangan: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Pilihan jenis permohonan yang valid sesuai dengan validasi di controller
  const jenisPermohonanOptions = [
    "Permohonan Baru",
    "Perpanjangan",
    "Pembaharuan"
  ];

  // Fungsi untuk mendapatkan token dari localStorage atau cookies
  const getAuthToken = () => {
    return localStorage.getItem('auth_token'); // Sesuaikan dengan nama token di aplikasi
  };

  // Fungsi untuk mendapatkan CSRF token dari meta tag (jika menggunakan Laravel)
  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    
    // Validasi dasar sebelum mengirim ke server
    const newErrors = {};
    if (!form.jenisPermohonan) {
      newErrors.jenisPermohonan = ["Jenis permohonan harus diisi"];
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Menyiapkan headers untuk request
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Tambahkan Auth token jika tersedia
      const authToken = getAuthToken();
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      // Tambahkan CSRF token jika tersedia (untuk Laravel)
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        headers['X-CSRF-TOKEN'] = csrfToken;
      }

      // Siapkan data yang akan dikirim
      // Pastikan parentId dikirim sebagai integer jika ada nilai
      const formData = {
        ...form,
        parentId: form.parentId ? parseInt(form.parentId) : null
      };

      // Kirim request ke API menggunakan fetch API
      const response = await fetch('http://localhost:8000/api/jenis-permohonan', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
        credentials: 'include' // Penting untuk mengirim cookies jika menggunakan cookie-based auth
      });

      if (!response.ok) {
        // Jika server mengembalikan error
        const errorData = await response.json();
        
        if (response.status === 401 || response.status === 403) {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          // Redirect ke halaman login
          window.location.href = "/login";
          return;
        } 
        
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          throw new Error(errorData.message || "Terjadi kesalahan saat menyimpan data");
        }
      } else {
        // Jika berhasil
        const data = await response.json();
        setSuccessMessage("Data berhasil ditambahkan!");
        setForm({ jenisPermohonan: "", parentId: "", keterangan: "" });
        console.log("Data berhasil disimpan:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
    },
    header: {
      backgroundColor: '#1a56db',
      color: 'white',
      padding: '16px 24px',
      borderLeft: '4px solid #0f3d9c',
      fontWeight: 'bold',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      marginRight: '8px',
      fontSize: '20px',
    },
    formContent: {
      padding: '24px',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333',
    },
    required: {
      color: '#e53e3e',
      marginLeft: '2px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f9f9ff',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f9f9ff',
      boxSizing: 'border-box',
      appearance: 'auto',
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f9f9ff',
      minHeight: '120px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    errorText: {
      color: '#d32f2f',
      fontSize: '12px',
      marginTop: '4px',
    },
    successMessage: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      padding: '12px 16px',
      borderRadius: '4px',
      margin: '16px 24px 0',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      borderLeft: '4px solid #4caf50',
    },
    successIcon: {
      marginRight: '8px',
      color: '#4caf50',
      fontSize: '18px',
    },
    infoBox: {
      backgroundColor: '#e6f2ff',
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '24px',
      borderLeft: '4px solid #3182ce',
    },
    infoTitle: {
      color: '#2c5282',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    infoList: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      margin: '0',
      fontSize: '14px',
      color: '#2c5282',
    },
    infoListItem: {
      marginBottom: '4px',
    },
    boldText: {
      fontWeight: 'bold',
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
    },
    saveButton: {
      backgroundColor: '#48bb78',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s',
    },
    saveButtonDisabled: {
      backgroundColor: '#48bb78',
      opacity: '0.6',
      cursor: 'not-allowed',
    },
    cancelButton: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s',
    },
    buttonIcon: {
      marginRight: '8px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerIcon}>📝</span>
          <span>Tambah Jenis Permohonan</span>
        </div>

        {/* Success message */}
        {successMessage && (
          <div style={styles.successMessage}>
            <span style={styles.successIcon}>✓</span>
            {successMessage}
          </div>
        )}

        <div style={styles.formContent}>
          {/* Jenis Permohonan Field */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="jenisPermohonan">
              Jenis Permohonan <span style={styles.required}>*</span>
            </label>
            <select
              id="jenisPermohonan"
              name="jenisPermohonan"
              value={form.jenisPermohonan}
              onChange={handleChange}
              style={styles.select}
              disabled={isSubmitting}
            >
              <option value="">Pilih Jenis Permohonan</option>
              {jenisPermohonanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.jenisPermohonan && (
              <p style={styles.errorText}>{errors.jenisPermohonan[0]}</p>
            )}
          </div>

          {/* Parent ID Field */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="parentId">
              Parent ID
            </label>
            <input
              type="number"
              id="parentId"
              name="parentId"
              value={form.parentId}
              onChange={handleChange}
              style={styles.input}
              disabled={isSubmitting}
              placeholder="Masukkan ID Parent (opsional)"
            />
            {errors.parentId && (
              <p style={styles.errorText}>{errors.parentId[0]}</p>
            )}
          </div>

          {/* Keterangan Field */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="keterangan">
              Keterangan
            </label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              style={styles.textarea}
              disabled={isSubmitting}
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
            />
            {errors.keterangan && (
              <p style={styles.errorText}>{errors.keterangan[0]}</p>
            )}
          </div>

          {/* Form Info */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Informasi Pengisian:</h3>
            <ul style={styles.infoList}>
              <li style={styles.infoListItem}>
                Jenis Permohonan hanya dapat diisi dengan: <span style={styles.boldText}>Permohonan Baru</span>, <span style={styles.boldText}>Perpanjangan</span>, atau <span style={styles.boldText}>Pembaharuan</span>
              </li>
              <li style={styles.infoListItem}>
                Parent ID bersifat opsional dan harus berupa angka
              </li>
              <li style={styles.infoListItem}>
                Keterangan bersifat opsional
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button
              onClick={handleSubmit}
              style={isSubmitting ? {...styles.saveButton, ...styles.saveButtonDisabled} : styles.saveButton}
              disabled={isSubmitting}
              onMouseOver={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#38a169';
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#48bb78';
              }}
            >
              <span style={styles.buttonIcon}>💾</span>
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              disabled={isSubmitting}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#cbd5e0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onClick={() => window.history.back()}
            >
              <span style={styles.buttonIcon}>❌</span>
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;