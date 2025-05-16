import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const EditPostForm = () => {
  const [form, setForm] = useState({
    jenisPermohonan: "",
    parentId: "",
    keterangan: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data jenisPermohonan berdasarkan ID
  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/${id}`)
        .then((res) => {
          setForm({
            jenisPermohonan: res.data.jenisPermohonan || "",
            parentId: res.data.parentId || "",
            keterangan: res.data.keterangan || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal memuat data:", error);
          alert("Data tidak ditemukan atau gagal diambil dari server.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    
    axios
      .put(`${API}/${id}`, form)
      .then(() => {
        alert("Data berhasil diperbarui.");
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          // Menangani kesalahan validasi dan menampilkannya
          setErrors(error.response.data.errors);
        } else {
          console.error("Gagal update data:", error);
          alert("Terjadi kesalahan saat menyimpan data.");
        }
      });
  };

  // Styles - sama seperti di CreatePostForm untuk konsistensi
  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: '#536878', // Slate blue-gray like in the reference
      color: 'white',
      padding: '16px 24px',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '0'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
    },
    form: {
      padding: '24px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f9f9ff', // Light blue background for inputs like in reference
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#f9f9ff', // Light blue background for inputs
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    errorText: {
      color: '#d32f2f',
      fontSize: '12px',
      marginTop: '4px',
    },
    button: {
      backgroundColor: '#536878', // Matches header color
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#455a6a', // Slightly darker on hover
    },
    loadingText: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '16px',
      color: '#536878',
    }
  };

  if (loading) return <p style={styles.loadingText}>Memuat data...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          Edit Jenis Permohonan
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="jenisPermohonan" style={styles.label}>Jenis Permohonan</label>
            <input
              type="text"
              id="jenisPermohonan"
              name="jenisPermohonan"
              value={form.jenisPermohonan}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.jenisPermohonan && (
              <div style={styles.errorText}>{errors.jenisPermohonan[0]}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="parentId" style={styles.label}>Parent ID (optional)</label>
            <input
              type="number"
              id="parentId"
              name="parentId"
              value={form.parentId}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.parentId && (
              <div style={styles.errorText}>{errors.parentId[0]}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="keterangan" style={styles.label}>Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              value={form.keterangan}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
            {errors.keterangan && (
              <div style={styles.errorText}>{errors.keterangan[0]}</div>
            )}
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;