import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PeruntukanSewaList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/peruntukan-sewa');
      setData(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/peruntukan-sewa/${id}`);
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
      }
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderLeft: '5px solid #3949AB',
      paddingLeft: '15px',
      marginBottom: '20px',
    },
    title: {
      margin: '0',
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#3949AB',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    plusIcon: {
      marginRight: '5px',
      fontSize: '16px',
    },
    tableContainer: {
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
      padding: '15px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
    },
    tableHeader: {
      backgroundColor: '#f4f4f4',
      textAlign: 'left',
      padding: '12px 15px',
      borderBottom: '1px solid #ddd',
      color: '#333',
      fontWeight: 'bold',
    },
    tableCell: {
      padding: '12px 15px',
      borderBottom: '1px solid #ddd',
    },
    actionCell: {
      display: 'flex',
      gap: '8px',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    deleteButton: {
      backgroundColor: '#F44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '20px',
      color: '#666',
    },
    pagination: {
      textAlign: 'right',
      padding: '10px 0',
      color: '#666',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Daftar Peruntukan Sewa</h2>
        <button 
          style={styles.addButton} 
          onClick={() => navigate('/peruntukansewa/add')}
        >
          <span style={styles.plusIcon}>+</span> Tambah Data
        </button>
      </div>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Jenis Kegiatan</th>
              <th style={styles.tableHeader}>Peruntukan</th>
              <th style={styles.tableHeader}>Keterangan</th>
              <th style={styles.tableHeader}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.idPeruntukanSewa}>
                  <td style={styles.tableCell}>{item.jenisKegiatan}</td>
                  <td style={styles.tableCell}>{item.peruntukanSewa}</td>
                  <td style={styles.tableCell}>{item.keterangan}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionCell}>
                      <button 
                        style={{ ...styles.editButton, backgroundColor: '#2196F3' }} 
                        onClick={() => navigate(`/peruntukansewa/${item.idPeruntukanSewa}`)}
                      >
                        Detail
                      </button>
                      <button 
                        style={styles.editButton} 
                        onClick={() => navigate(`/peruntukansewa/edit/${item.idPeruntukanSewa}`)}
                      >
                        Edit
                      </button>
                      <button 
                        style={styles.deleteButton} 
                        onClick={() => handleDelete(item.idPeruntukanSewa)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.emptyState}>
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {data.length > 0 && (
          <div style={styles.pagination}>
            Menampilkan {data.length} dari {data.length} data
          </div>
        )}
      </div>
    </div>
  );
}

export default PeruntukanSewaList;