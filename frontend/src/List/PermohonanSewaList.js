import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PermohonanSewaList = () => {
  const [permohonans, setPermohonans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/permohonan-sewa');
      setPermohonans(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/permohonan-sewa/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
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
    addButton: {
      backgroundColor: '#2e51a2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '10px 15px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-flex',
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      textAlign: 'left',
      padding: '15px',
      borderBottom: '1px solid #e0e0e0',
      color: '#555',
      fontWeight: 'bold',
    },
    tableRow: {
      borderBottom: '1px solid #e0e0e0',
    },
    tableCell: {
      padding: '15px',
      color: '#333',
    },
    statusCell: {
      padding: '15px',
    },
    statusBadge: {
      padding: '5px 10px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'inline-block',
    },
    statusPending: {
      backgroundColor: '#FFF4E5',
      color: '#FF9800',
    },
    statusApproved: {
      backgroundColor: '#E8F5E9',
      color: '#4CAF50',
    },
    statusRejected: {
      backgroundColor: '#FEEBEE',
      color: '#F44336',
    },
    actionCell: {
      padding: '15px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'flex-end',
    },
    actionButton: {
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '12px',
    },
    editButton: {
      backgroundColor: '#E3F2FD',
      color: '#1976D2',
    },
    deleteButton: {
      backgroundColor: '#FEEBEE',
      color: '#F44336',
    },
    loadingMessage: {
      textAlign: 'center',
      padding: '20px',
      color: '#666',
    },
    noDataMessage: {
      textAlign: 'center',
      padding: '30px',
      color: '#666',
      borderBottom: '1px solid #e0e0e0',
    },
  };

  const getStatusStyles = (status) => {
    if (status === 'disetujui') return styles.statusApproved;
    if (status === 'ditolak') return styles.statusRejected;
    return styles.statusPending;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Daftar Permohonan Sewa</h2>
        <Link to="/permohonansewa/add" style={styles.addButton}>
          + Tambah Data
        </Link>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Nomor Surat</th>
              <th style={styles.tableHeader}>Nama Pemohon</th>
              <th style={styles.tableHeader}>Tanggal</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Keterangan</th>
              <th style={styles.tableHeader}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={styles.loadingMessage}>
                  Memuat data...
                </td>
              </tr>
            ) : permohonans.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noDataMessage}>
                  Belum ada data permohonan sewa
                </td>
              </tr>
            ) : (
              permohonans.map((item) => (
                <tr key={item.idPermohonanSewa} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.nomorSuratPermohonan}</td>
                  <td style={styles.tableCell}>{item.namaPemohon}</td>
                  <td style={styles.tableCell}>
                    {new Date(item.tanggalPermohonan).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={styles.statusCell}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...getStatusStyles(item.status),
                      }}
                    >
                      {item.status || 'Menunggu'}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{item.keterangan || '-'}</td>
                  <td style={styles.actionCell}>
                    <Link
                      to={`/permohonansewa/detail/${item.idPermohonanSewa}`}
                      style={{ ...styles.actionButton, backgroundColor: '#E8F5E9', color: '#4CAF50' }}
                    >
                      Detail
                    </Link>
                    <Link
                      to={`/permohonansewa/edit/${item.idPermohonanSewa}`}
                      style={{...styles.actionButton, ...styles.editButton}}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.idPermohonanSewa)}
                      style={{...styles.actionButton, ...styles.deleteButton}}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermohonanSewaList;