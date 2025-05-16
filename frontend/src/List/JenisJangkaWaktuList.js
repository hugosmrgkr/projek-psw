import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DaftarJenisJangkaWaktu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/jenis-jangka-waktu");
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data. Silakan coba lagi.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/jenis-jangka-waktu/${id}`);
        
        // Show success notification
        const notification = document.createElement("div");
        notification.className = "toast-notification success";
        notification.innerHTML = "Data berhasil dihapus";
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.classList.add("show");
        }, 100);
        
        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);
        
        getData();
      } catch (err) {
        console.error("Error deleting data:", err);
        alert("Gagal menghapus data. Silakan coba lagi.");
      }
    }
  };

  // Custom styles
  const styles = {
    pageContainer: {
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      margin: "0",
    },
    addButton: {
      backgroundColor: "#2e51a2",
      borderColor: "#2e51a2",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    tableHeaderCell: {
      backgroundColor: "#2e51a2",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "13px",
    },
    editButton: {
      backgroundColor: "#f2a532",
      borderColor: "#f2a532",
    },
    deleteButton: {
      backgroundColor: "#e74a3b",
      borderColor: "#e74a3b",
    },
    loadingContainer: {
      padding: "40px",
      textAlign: "center",
      color: "#666",
    },
    numberCell: {
      width: "60px",
      textAlign: "center",
    },
    actionCell: {
      width: "200px",
    },
    toast: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "4px",
      backgroundColor: "#4CAF50",
      color: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      zIndex: 9999,
      opacity: 0,
      transform: "translateY(20px)",
      transition: "all 0.3s ease",
    },
    toastShow: {
      opacity: 1,
      transform: "translateY(0)",
    },
  };

  // Custom CSS for the toast notification
  const toastCSS = `
    .toast-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 4px;
      color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 9999;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }
    
    .toast-notification.success {
      background-color: #4CAF50;
    }
    
    .toast-notification.error {
      background-color: #F44336;
    }
    
    .toast-notification.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  return (
    <div style={styles.pageContainer} className="container">
      {/* Insert the toast CSS */}
      <style>{toastCSS}</style>
      
      <div style={styles.headerContainer} className="mb-4">
        <h2 style={styles.title}>Data Jenis Jangka Waktu</h2>
        <Link to="/JenisJangkaWaktu/tambah" className="btn btn-primary" style={styles.addButton}>
          <span>➕</span> Tambah Jenis
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div style={styles.card}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Memuat data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted mb-0">Belum ada data jenis jangka waktu.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th style={{...styles.tableHeaderCell, ...styles.numberCell}}>No</th>
                  <th style={styles.tableHeaderCell}>Jenis Jangka Waktu</th>
                  <th style={styles.tableHeaderCell}>Keterangan</th>
                  <th style={{...styles.tableHeaderCell, ...styles.actionCell}}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.idJenisJangkaWaktu}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.jenisJangkaWaktu}</td>
                    <td>{item.keterangan || "-"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/JenisJangkaWaktu/detail/${item.idJenisJangkaWaktu}`}
                          className="btn btn-sm btn-info"
                          style={{ ...styles.actionButton, backgroundColor: "#17a2b8", borderColor: "#17a2b8", color: "#fff" }}
                        >
                          <span>🔍</span> Detail
                        </Link>
                        <Link
                          to={`/JenisJangkaWaktu/edit/${item.idJenisJangkaWaktu}`}
                          className="btn btn-sm btn-warning"
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <span>✏️</span> Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          style={{...styles.actionButton, ...styles.deleteButton}}
                          onClick={() => handleDelete(item.idJenisJangkaWaktu)}
                        >
                          <span>🗑️</span> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarJenisJangkaWaktu;