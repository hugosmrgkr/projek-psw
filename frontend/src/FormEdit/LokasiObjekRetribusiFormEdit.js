import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LokasiObjekRetribusiFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lokasiObjekRetribusi: '',
    keterangan: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`)
      .then(res => {
        setFormData(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Gagal mengambil data:', err);
        setError('Gagal mengambil data. Silakan coba lagi.');
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`, formData)
      .then(response => {
        alert('Data berhasil diperbarui!');
        navigate('/lokasi-objek-retribusi');
      })
      .catch(error => {
        console.error('Gagal memperbarui:', error);
        alert('Gagal memperbarui data.');
      });
  };

  const handleCancel = () => {
    navigate('/lokasi-objek-retribusi');
  };

  if (isLoading) return <div className="container">Memuat data...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <>
      <style>{`
        /* Main Variables */
        :root {
          --primary-blue: #3949AB;
          --green-button: #4CAF50;
          --cancel-gray: #f1f1f1;
          --cancel-text: #E53935;
          --border-color: #e0e0e0;
          --text-color: #444;
          --placeholder-color: #757575;
          --bg-color: #fff;
          --form-bg: #fff;
          --label-color: #333;
          --required-color: #E53935;
        }

        /* General Styles */
        .container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 15px;
          font-family: 'Roboto', Arial, sans-serif;
          background-color: #f9f9f9;
          color: var(--text-color);
          line-height: 1.6;
        }

        /* Form Card Styling */
        .form-card {
          background-color: var(--form-bg);
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 25px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }

        /* Blue Left Border Accent */
        .form-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 5px;
          background-color: var(--primary-blue);
        }

        /* Form Header */
        .form-header {
          margin-bottom: 25px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 15px;
        }

        .form-title {
          font-size: 24px;
          font-weight: 500;
          color: var(--text-color);
          margin: 0 0 10px 0;
        }

        .form-subtitle {
          font-size: 14px;
          color: var(--placeholder-color);
          margin: 0;
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 25px;
        }

        label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--label-color);
          font-size: 16px;
        }

        .required::after {
          content: ' *';
          color: var(--required-color);
        }

        /* Form Elements */
        input[type="text"],
        textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 16px;
          transition: border 0.3s ease;
          box-sizing: border-box;
        }

        input[type="text"]:focus,
        textarea:focus {
          outline: none;
          border-color: var(--primary-blue);
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        ::placeholder {
          color: var(--placeholder-color);
          opacity: 0.7;
        }

        /* Help Text */
        .help-text {
          font-size: 12px;
          color: var(--placeholder-color);
          margin-top: 5px;
        }

        /* Buttons */
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .btn {
          padding: 12px 25px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background-color: var(--green-button);
          color: white;
        }

        .btn-primary:hover {
          background-color: #43A047;
        }

        .btn-cancel {
          background-color: var(--cancel-gray);
          color: var(--cancel-text);
        }

        .btn-cancel:hover {
          background-color: #e5e5e5;
        }

        /* Button Icons */
        .btn-icon {
          margin-right: 8px;
        }

        /* Responsive adjustments */
        @media screen and (max-width: 768px) {
          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Edit Lokasi Objek Retribusi</h1>
            <p className="form-subtitle">Silakan edit formulir di bawah ini untuk memperbarui lokasi objek retribusi.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="lokasiObjekRetribusi" className="required">Nama Lokasi</label>
              <input
                type="text"
                id="lokasiObjekRetribusi"
                value={formData.lokasiObjekRetribusi || ''}
                onChange={(e) => setFormData({ ...formData, lokasiObjekRetribusi: e.target.value })}
                placeholder="Masukkan nama lokasi"
                required
              />
              <div className="help-text">Contoh: Pasar Sentral, Terminal Bus, Area Parkir Mall</div>
            </div>

            <div className="form-group">
              <label htmlFor="keterangan">Keterangan</label>
              <textarea
                id="keterangan"
                value={formData.keterangan || ''}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                <span className="btn-icon">💾</span> Simpan Perubahan
              </button>
              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                <span className="btn-icon">✖️</span> Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LokasiObjekRetribusiFormEdit;