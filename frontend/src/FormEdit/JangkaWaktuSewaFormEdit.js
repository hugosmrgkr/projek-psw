import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JangkaWaktuSewaFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktuSewa: '',
    keterangan: '',
    isDefault: false
  });

  const [jenisList, setJenisList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/jangka-waktu-sewa/${id}`)
      .then(res => {
        setFormData(res.data.data); // sesuaikan struktur respons
      })
      .catch(err => {
        console.error('Gagal mengambil data jangka waktu:', err);
      });

    // Ambil daftar jenis jangka waktu
    axios
      .get('http://localhost:8000/api/jenis-jangka-waktu')
      .then(res => {
        setJenisList(res.data.data);
      })
      .catch(err => {
        console.error('Gagal mengambil data jenis jangka waktu:', err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/jangka-waktu-sewa/${id}`, formData)
      .then(() => {
        alert('Data berhasil diperbarui!');
        navigate('/jangka-waktu-sewa');
      })
      .catch(err => {
        console.error('Gagal memperbarui data:', err);
        alert('Gagal update. Silakan cek console.');
      });
  };

  const handleBack = () => {
    navigate('/jangka-waktu-sewa');
  };

  return (
    <div className="form-container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>← Kembali</button>
        <h2 className="form-title">Edit Jenis Jangka Waktu</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Jenis Jangka Waktu</label>
          <select
            value={formData.idJenisJangkaWaktu}
            onChange={(e) =>
              setFormData({ ...formData, idJenisJangkaWaktu: e.target.value })
            }
            required
          >
            <option value="">Pilih Jenis Jangka Waktu</option>
            {jenisList.map(jenis => (
              <option
                key={jenis.idJenisJangkaWaktu}
                value={jenis.idJenisJangkaWaktu}
              >
                {jenis.jenisJangkaWaktu}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Jangka Waktu Sewa</label>
          <input
            type="text"
            placeholder="Contoh: 1 Bulan / 12 Minggu"
            value={formData.jangkaWaktuSewa}
            onChange={(e) =>
              setFormData({ ...formData, jangkaWaktuSewa: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Keterangan</label>
          <textarea
            placeholder="Masukkan keterangan"
            value={formData.keterangan}
            onChange={(e) =>
              setFormData({ ...formData, keterangan: e.target.value })
            }
          />
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            id="defaultCheck"
            checked={formData.isDefault}
            onChange={(e) =>
              setFormData({ ...formData, isDefault: e.target.checked })
            }
          />
          <label htmlFor="defaultCheck">Default?</label>
        </div>

        <div className="button-container">
          <button type="button" className="cancel-button" onClick={handleBack}>Batal</button>
          <button type="submit" className="submit-button">Simpan</button>
        </div>
      </form>

      <style>
        {`
          .form-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          
          .header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 10px;
          }
          
          .back-button {
            background: none;
            border: none;
            color: #2563eb;
            font-size: 16px;
            cursor: pointer;
            padding: 5px 10px;
            margin-right: 15px;
            text-decoration: none;
          }
          
          .form-title {
            color: #333;
            font-size: 24px;
            font-weight: 500;
            margin: 0;
          }
          
          form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          label {
            font-weight: 500;
            color: #333;
            font-size: 16px;
          }
          
          input[type="text"],
          select,
          textarea {
            padding: 12px 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
          }
          
          textarea {
            min-height: 150px;
            resize: vertical;
          }
          
          select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 16px;
            padding-right: 45px;
          }
          
          .form-checkbox {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .form-checkbox input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #2563eb;
          }
          
          .button-container {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 20px;
          }
          
          .cancel-button {
            padding: 12px 24px;
            background-color: #fff;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .submit-button {
            padding: 12px 24px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          
          .cancel-button:hover {
            background-color: #f3f4f6;
          }
          
          .submit-button:hover {
            background-color: #1d4ed8;
          }
          
          input:focus,
          select:focus,
          textarea:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .form-container {
              padding: 15px;
            }
            
            .button-container {
              flex-direction: column;
            }
            
            .cancel-button, .submit-button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default JangkaWaktuSewaFormEdit;