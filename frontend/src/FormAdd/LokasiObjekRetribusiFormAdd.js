import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LokasiObjekRetribusiFormAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lokasiObjekRetribusi: '',
    keterangan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://localhost:8000/api/lokasi-objek-retribusi', formData)
      .then(response => {
        setLoading(false);
        alert('Data berhasil ditambahkan!');
        navigate('/lokasiobjekretribusi'); // Redirect ke halaman list
      })
      .catch(error => {
        setLoading(false);
        console.error('Gagal menyimpan:', error);
        alert('Gagal menyimpan data.');
      });
  };

  return (
    <div className="container-fluid">
      <style>
        {`
          /* Variabel warna utama - sesuaikan dengan warna sidebar Anda */
          :root {
            --primary-color: #3f51b5;
            --primary-hover: #303f9f;
            --secondary-color: #ff9800;
            --secondary-hover: #f57c00;
            --success-color: #4caf50;
            --success-hover: #388e3c;
            --danger-color: #f44336;
            --danger-hover: #d32f2f;
            --light-bg: #f5f7fa;
            --border-color: #e0e0e0;
            --text-dark: #333333;
            --text-light: #757575;
            --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          }

          /* Main content wrapper */
          .content-wrapper {
            padding: 24px;
            background-color: #f8f9fa;
            min-height: calc(100vh - 60px);
          }

          /* Styling for form card */
          .form-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: var(--box-shadow);
            padding: 28px;
            margin-bottom: 30px;
          }

          /* Header styling */
          .page-header {
            margin-bottom: 28px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 16px;
          }

          .page-title {
            color: var(--text-dark);
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            padding-bottom: 8px;
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

          /* Form group styling */
          .form-group {
            margin-bottom: 24px;
          }

          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--text-dark);
            font-size: 15px;
          }

          .form-control {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            font-size: 15px;
            transition: all 0.2s ease;
          }

          .form-control:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
          }

          .form-text {
            font-size: 13px;
            color: var(--text-light);
            margin-top: 5px;
          }

          .form-textarea {
            min-height: 120px;
            resize: vertical;
          }

          /* Button styling */
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }

          .btn-primary {
            background-color: var(--primary-color);
            color: white;
          }

          .btn-primary:hover {
            background-color: var(--primary-hover);
          }

          .btn-success {
            background-color: var(--success-color);
            color: white;
          }

          .btn-success:hover {
            background-color: var(--success-hover);
          }

          .btn-secondary {
            background-color: #f2f2f2;
            color: var(--text-dark);
          }

          .btn-secondary:hover {
            background-color: #e6e6e6;
          }

          /* Button container */
          .btn-container {
            display: flex;
            gap: 12px;
            margin-top: 16px;
          }

          /* Required indicator */
          .required-indicator::after {
            content: ' *';
            color: var(--danger-color);
          }

          /* Loading overlay */
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
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
          
          /* Responsive styling */
          @media (max-width: 768px) {
            .form-card {
              padding: 20px;
            }
            
            .btn-container {
              flex-direction: column;
            }
            
            .btn {
              width: 100%;
            }
          }
        `}
      </style>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="row">
        <div className="col-md-12 p-0">
          <div className="content-wrapper">
            <div className="form-card">
              <div className="page-header">
                <h2 className="page-title">Tambah Lokasi Objek Retribusi</h2>
                <p className="form-text">Silakan isi formulir di bawah ini untuk menambahkan lokasi objek retribusi baru.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="lokasiObjekRetribusi" className="form-label required-indicator">
                    Nama Lokasi
                  </label>
                  <input
                    id="lokasiObjekRetribusi"
                    type="text"
                    name="lokasiObjekRetribusi"
                    className="form-control"
                    value={formData.lokasiObjekRetribusi}
                    onChange={handleChange}
                    placeholder="Masukkan nama lokasi"
                    required
                  />
                  <small className="form-text">
                    Contoh: Pasar Sentral, Terminal Bus, Area Parkir Mall
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan
                  </label>
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    className="form-control form-textarea"
                    value={formData.keterangan}
                    onChange={handleChange}
                    placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
                  />
                </div>

                <div className="btn-container">
                  <button type="submit" className="btn btn-success">
                    💾 Simpan Data
                  </button>
                  <Link to="/lokasiobjekretribusi" className="btn btn-secondary">
                    ❌ Batal
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LokasiObjekRetribusiFormAdd;