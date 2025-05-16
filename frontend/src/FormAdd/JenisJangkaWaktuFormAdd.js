import React, { useState } from "react";
import axios from "axios";

const FormTambahJenisJangkaWaktu = () => {
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");

  // Define colors based on the TobaLink design
  const colors = {
    primary: "#1e3a8a", // Dark blue from sidebar
    accent: "#1d4ed8", // Button blue
    danger: "#b91c1c", // Red from Keluar button
    white: "#ffffff",
    lightGray: "#f3f4f6",
    textDark: "#1f2937",
    borderColor: "#e5e7eb"
  };

  const styles = {
    container: {
      backgroundColor: colors.white,
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    },
    header: {
      color: colors.textDark,
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: `1px solid ${colors.borderColor}`,
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      color: colors.textDark,
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: `1px solid ${colors.borderColor}`,
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: `1px solid ${colors.borderColor}`,
      fontSize: "1rem",
      minHeight: "120px",
      outline: "none",
      transition: "border-color 0.2s ease",
      resize: "vertical",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      marginTop: "1rem",
    },
    buttonSubmit: {
      backgroundColor: colors.accent,
      color: colors.white,
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: "none",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    buttonCancel: {
      backgroundColor: colors.lightGray,
      color: colors.textDark,
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      border: `1px solid ${colors.borderColor}`,
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/jenis-jangka-waktu", {
        jenisJangkaWaktu,
        keterangan,
      });
      alert("Data berhasil ditambahkan.");
      setJenisJangkaWaktu("");
      setKeterangan("");
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Tambah Jenis Jangka Waktu</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="jenisJangkaWaktu">Jenis Jangka Waktu</label>
          <input
            id="jenisJangkaWaktu"
            style={styles.input}
            type="text"
            placeholder="Masukkan jenis jangka waktu"
            value={jenisJangkaWaktu}
            onChange={(e) => setJenisJangkaWaktu(e.target.value)}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="keterangan">Keterangan</label>
          <textarea
            id="keterangan"
            style={styles.textarea}
            placeholder="Masukkan keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            style={styles.buttonCancel}
            onClick={() => {
              setJenisJangkaWaktu("");
              setKeterangan("");
            }}
          >
            Batal
          </button>
          <button type="submit" style={styles.buttonSubmit}>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTambahJenisJangkaWaktu;