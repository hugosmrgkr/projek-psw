import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JenisObjekRetribusiList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:8000/api/jenis-objek-retribusi")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      axios.delete(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
        .then(() => fetchData())
        .catch((err) => alert("Gagal hapus data."));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = searchTerm 
    ? data.filter(item =>
        item.jenisObjekRetribusi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return (
    <div className="container mt-4">
      <style>
        {`
          /* Variabel warna utama - sesuaikan dengan warna sidebar Anda */
          :root {
            --primary-color: #3f51b5;
            --primary-hover: #303f9f;
            --secondary-color: #ff9800;
            --secondary-hover: #f57c00;
            --danger-color: #f44336;
            --danger-hover: #d32f2f;
            --light-bg: #f5f7fa;
            --border-color: #e0e0e0;
            --text-dark: #333333;
            --text-light: #757575;
          }

          /* Styling container & card */
          .content-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 24px;
            margin-bottom: 30px;
          }

          /* Header styling */
          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
            gap: 16px;
          }

          .page-title {
            color: var(--text-dark);
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
          }

          .page-title::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 24px;
            background-color: var(--primary-color);
            margin-right: 12px;
            border-radius: 3px;
          }

          /* Actions bar styling */
          .actions-bar {
            display: flex;
            gap: 12px;
            align-items: center;
          }

          .search-input {
            padding: 8px 12px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 14px;
            width: 250px;
            transition: all 0.2s ease;
          }

          .search-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
          }

          /* Button styling */
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }

          .btn-icon {
            padding: 6px 10px;
          }

          .btn-primary {
            background-color: var(--primary-color);
            color: white;
          }

          .btn-primary:hover {
            background-color: var(--primary-hover);
          }

          .btn-warning {
            background-color: var(--secondary-color);
            color: white;
          }

          .btn-warning:hover {
            background-color: var(--secondary-hover);
          }

          .btn-danger {
            background-color: var(--danger-color);
            color: white;
          }

          .btn-danger:hover {
            background-color: var(--danger-hover);
          }

          /* Table styling */
          .data-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-top: 16px;
          }

          .data-table th, 
          .data-table td {
            padding: 12px 16px;
            text-align: left;
          }

          .data-table th {
            background-color: var(--light-bg);
            color: var(--text-light);
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid var(--border-color);
          }

          .data-table tbody tr {
            border-bottom: 1px solid var(--border-color);
            transition: background-color 0.15s ease;
          }

          .data-table tbody tr:hover {
            background-color: rgba(63, 81, 181, 0.03);
          }

          .data-table tbody tr:last-child {
            border-bottom: none;
          }

          /* Action buttons container */
          .action-buttons {
            display: flex;
            gap: 8px;
          }

          /* Loading indicator */
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }

          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: var(--primary-color);
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Status indicator */
          .table-status {
            font-size: 14px;
            color: var(--text-light);
            margin-top: 12px;
            text-align: right;
          }
          
          /* Responsive styling */
          @media (max-width: 768px) {
            .page-header {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .actions-bar {
              width: 100%;
              flex-wrap: wrap;
            }
            
            .search-input {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="content-card">
        <div className="page-header">
          <h2 className="page-title">Daftar Jenis Objek Retribusi</h2>
          
          <div className="actions-bar">
            
            
            <Link to="/jenisobjekretribusi/create" className="btn btn-primary">
              ➕ Tambah Data
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>#</th>
                  <th style={{ width: '30%' }}>Jenis Objek</th>
                  <th style={{ width: '45%' }}>Keterangan</th>
                  <th style={{ width: '20%' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, i) => (
                    <tr key={item.idJenisObjekRetribusi}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: '500' }}>{item.jenisObjekRetribusi}</td>
                      <td>{item.keterangan}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/jenisobjekretribusi/detail/${item.idJenisObjekRetribusi}`}
                            className="btn btn-primary btn-icon"
                            title="Lihat Detail"
                          >
                            👁️
                          </Link>
                          <Link
                            to={`/jenisobjekretribusi/edit/${item.idJenisObjekRetribusi}`}
                            className="btn btn-warning btn-icon"
                            title="Edit Data"
                          >
                            ✏️
                          </Link>
                          <button
                            className="btn btn-danger btn-icon"
                            onClick={() => handleDelete(item.idJenisObjekRetribusi)}
                            title="Hapus Data"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            
            <div className="table-status">
              Menampilkan {filteredData.length} dari {data.length} data
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JenisObjekRetribusiList;