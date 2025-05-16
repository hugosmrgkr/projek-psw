import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JangkaWaktuSewaList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/api/jangka-waktu-sewa')
      .then(res => {
        setData(res.data.data); // pastikan struktur respons sesuai
      })
      .catch(err => {
        console.error('Gagal mengambil data:', err);
        alert('Gagal memuat data.');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      axios
        .delete(`http://localhost:8000/api/jangka-waktu-sewa/${id}`)
        .then(() => {
          alert('Data berhasil dihapus!');
          fetchData();
        })
        .catch(err => {
          console.error('Gagal menghapus data:', err);
          alert('Gagal menghapus. Cek console.');
        });
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#333',
      margin: '0',
    },
    addButton: {
      backgroundColor: '#3f50b5',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s',
    },
    addButtonText: {
      marginLeft: '8px',
    },
    plusIcon: {
      fontSize: '18px',
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '16px',
      borderBottom: '1px solid #e0e0e0',
      color: '#555',
      fontWeight: '600',
      fontSize: '14px',
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '14px',
      color: '#333',
    },
    center: {
      textAlign: 'center',
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
    },
    editButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    emptyState: {
      backgroundColor: '#f8f9fa',
      padding: '24px',
      textAlign: 'center',
      color: '#6c757d',
      fontSize: '16px',
      borderRadius: '8px',
      margin: '24px 0',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Data Jenis Jangka Waktu</h2>
        <Link to="/JangkaWaktuSewa/tambah" style={{ textDecoration: 'none' }}>
          <button style={styles.addButton}>
            <span style={styles.plusIcon}>+</span>
            <span style={styles.addButtonText}>Tambah Jenis</span>
          </button>
        </Link>
      </div>

      {data.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{...styles.th, width: '8%'}}>No</th>
                <th style={{...styles.th, width: '25%'}}>Jangka Waktu</th>
                <th style={{...styles.th, width: '35%'}}>Keterangan</th>
                <th style={{...styles.th, width: '15%'}}>Default</th>
                <th style={{...styles.th, width: '17%'}}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.idJangkaWaktuSewa}>
                  <td style={{...styles.td, ...styles.center}}>{index + 1}</td>
                  <td style={styles.td}>{item.jangkaWaktuSewa}</td>
                  <td style={styles.td}>{item.keterangan || '-'}</td>
                  <td style={{...styles.td, ...styles.center}}>{item.isDefault ? 'Ya' : 'Tidak'}</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <Link to={`/JangkaWaktuSewa/detail/${item.idJangkaWaktuSewa}`} style={{ textDecoration: 'none' }}>
                        <button style={styles.editButton}>Detail</button>
                      </Link>
                      <Link to={`/JangkaWaktuSewa/edit/${item.idJangkaWaktuSewa}`} style={{ textDecoration: 'none' }}>
                        <button style={styles.editButton}>Edit</button>
                      </Link>
                      <button 
                        style={styles.deleteButton} 
                        onClick={() => handleDelete(item.idJangkaWaktuSewa)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={styles.emptyState}>
          Belum ada data jenis jangka waktu.
        </div>
      )}
    </div>
  );
};

export default JangkaWaktuSewaList;