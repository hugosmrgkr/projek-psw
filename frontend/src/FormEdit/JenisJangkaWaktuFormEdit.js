import { useState } from "react";

const FormEditJenisJangkaWaktu = () => {
  // Mock data to simulate fetched data (in a real app this would come from params/API)
  const [jenisJangkaWaktu, setJenisJangkaWaktu] = useState("Bulanan");
  const [keterangan, setKeterangan] = useState("Pembayaran dilakukan setiap bulan");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    container: {
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
    },
    header: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1.5rem",
      paddingBottom: "0.75rem",
      borderBottom: "1px solid #e5e7eb",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      minHeight: "8rem",
      resize: "vertical",
      outline: "none",
      boxSizing: "border-box",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      marginTop: "1.5rem",
    },
    buttonCancel: {
      padding: "0.5rem 1rem",
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
    },
    buttonSubmit: {
      padding: "0.5rem 1rem",
      backgroundColor: "#1e3a8a", // Dark blue from TobaLink design
      color: "#ffffff",
      border: "none",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "6rem",
    },
    buttonSubmitHover: {
      backgroundColor: "#1e40af",
    },
    buttonSubmitDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    successMessage: {
      marginTop: "1rem",
      padding: "0.75rem",
      backgroundColor: "#d1fae5",
      color: "#065f46",
      borderRadius: "0.375rem",
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API update
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }, 800);
  };

  const handleCancel = () => {
    // In a real app, this would navigate back
    alert("Kembali ke halaman sebelumnya");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Jenis Jangka Waktu</h2>
      
      <div>
        <div style={styles.formGroup}>
          <label 
            style={styles.label} 
            htmlFor="jenisJangkaWaktu"
          >
            Jenis Jangka Waktu
          </label>
          <input
            id="jenisJangkaWaktu"
            style={styles.input}
            type="text"
            value={jenisJangkaWaktu}
            onChange={(e) => setJenisJangkaWaktu(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = styles.inputFocus.borderColor;
              e.target.style.boxShadow = styles.inputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = styles.input.border.split(" ")[2];
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label 
            style={styles.label} 
            htmlFor="keterangan"
          >
            Keterangan
          </label>
          <textarea
            id="keterangan"
            style={styles.textarea}
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = styles.inputFocus.borderColor;
              e.target.style.boxShadow = styles.inputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = styles.textarea.border.split(" ")[2];
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            style={styles.buttonCancel}
            onClick={handleCancel}
          >
            Batal
          </button>
          <button 
            type="button" 
            style={{
              ...styles.buttonSubmit,
              ...(isLoading ? styles.buttonSubmitDisabled : {})
            }}
            onClick={handleSubmit}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = styles.buttonSubmitHover.backgroundColor;
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.buttonSubmit.backgroundColor;
            }}
          >
            {isLoading ? "Menyimpan..." : "Update"}
          </button>
        </div>
        
        {isSubmitted && (
          <div style={styles.successMessage}>
            Data berhasil diupdate.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEditJenisJangkaWaktu;