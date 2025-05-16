import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WajibRetribusiList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWajibRetribusi = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/wajib-retribusi');
        setData(response.data.data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    fetchWajibRetribusi();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/wajib-retribusi/${id}`);
        setData(data.filter(item => item.idWajibRetribusi !== id));
      } catch (error) {
        console.error('Gagal menghapus data:', error);
      }
    }
  };

  return (
    <>
      <style>{`
        .container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-title {
          display: flex;
          align-items: center;
        }

        .blue-bar {
          width: 4px;
          height: 32px;
          background-color: #4054b2;
          margin-right: 15px;
          border-radius: 2px;
        }

        .header-title h2 {
          color: #333;
          font-size: 24px;
          margin: 0;
        }

        .add-button {
          background-color: #4054b2;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          display: flex;
          align-items: center;
          transition: background-color 0.3s;
        }

        .add-button:hover {
          background-color: #34439e;
        }

        .plus-icon {
          margin-right: 5px;
          font-weight: bold;
        }

        .table-container {
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background-color: #f8f9fa;
          color: #666;
          text-align: left;
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
          font-weight: 600;
        }

        td {
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
          color: #333;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr:hover {
          background-color: #f9f9f9;
        }

        .column-actions {
          width: 150px;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .edit-button, .detail-button {
          background-color: #ffa000;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .delete-button {
          background-color: #f44336;
          color: white;
          border: none;
          width: 35px;
          height: 35px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-info {
          padding: 15px;
          color: #666;
          text-align: right;
          border-top: 1px solid #e0e0e0;
          font-size: 14px;
        }

        .no-data {
          text-align: center;
          color: #666;
          padding: 30px 0;
        }
      `}</style>

      <div className="container">
        <div className="header-container">
          <div className="header-title">
            <div className="blue-bar"></div>
            <h2>Daftar Wajib Retribusi</h2>
          </div>
          <Link to="/wajib-retribusi/add" className="add-button">
            <span className="plus-icon">+</span> Tambah Wajib Retribusi
          </Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Kontak</th>
                <th className="column-actions">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr key={item.idWajibRetribusi}>
                    <td>{idx + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.kontak}</td>
                    <td className="action-buttons">
                      <Link
                        to={`/wajib-retribusi/detail/${item.idWajibRetribusi}`}
                        className="detail-button"
                        title="Detail"
                      >
                        👁️
                      </Link>
                      <Link
                        to={`/wajib-retribusi/edit/${item.idWajibRetribusi}`}
                        className="edit-button"
                        title="Edit"
                      >
                        ✎
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(item.idWajibRetribusi)}
                        title="Hapus"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination-info">
            Menampilkan {data.length > 0 ? 1 : 0} dari {data.length} data
          </div>
        </div>
      </div>
    </>
  );
};

export default WajibRetribusiList;
