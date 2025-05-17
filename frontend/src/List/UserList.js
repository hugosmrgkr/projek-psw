import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api/user";


const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get(API).then((res) => {
      setUsers(res.data.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      axios.delete(`${API}/${id}`).then(fetchUsers);
    }
  };

  return (
    <div className="app-container">
     
      <div className="content-container">
        <div className="user-list-container">
          <div className="header-container">
            <h2 className="page-title">Daftar User</h2>
            <Link to="/user/tambah" className="add-button">+ Tambah User</Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Keterangan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.userId}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`status-badge ${u.isDeleted ? "inactive" : "active"}`}>
                        {u.isDeleted ? "Nonaktif" : "Aktif"}
                      </span>
                    </td>
                    <td>{u.keterangan}</td>
                    <td className="action-buttons">
                      <Link to={`/user/edit/${u.userId}`} className="edit-button">Edit</Link>
                      <button 
                        onClick={() => handleDelete(u.userId)} 
                        className="delete-button"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .app-container {
          display: flex;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        /* Main content area */
        .content-container {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        /* User list container */
        .user-list-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        /* Header with title and add button */
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #eaedf3;
        }

        .page-title {
          color: #2d3748;
          font-size: 24px;
          font-weight: 600;
        }

        .add-button {
          display: inline-block;
          background-color: #1e40af; /* Deep blue to match sidebar */
          color: white;
          padding: 10px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .add-button:hover {
          background-color: #2563eb;
        }

        /* Table styles */
        .table-container {
          padding: 0 0 20px 0;
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background-color: #f8fafc;
          padding: 16px 24px;
          text-align: left;
          font-weight: 600;
          color: #64748b;
          font-size: 14px;
          white-space: nowrap;
          border-bottom: 1px solid #eaedf3;
        }

        .data-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #eaedf3;
          color: #4a5568;
        }

        .data-table tr:hover {
          background-color: #f8fafc;
        }

        /* Status badges */
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
        }

        .active {
          background-color: #e6fffa;
          color: #047857;
        }

        .inactive {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .edit-button {
          display: inline-block;
          padding: 6px 12px;
          background-color: #3b82f6;
          color: white;
          border-radius: 4px;
          text-decoration: none;
          font-size: 13px;
          transition: background-color 0.2s;
        }

        .edit-button:hover {
          background-color: #2563eb;
        }

        .delete-button {
          padding: 6px 12px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          transition: background-color 0.2s;
        }

        .delete-button:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default UserList;