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
    <div className="container mt-4">
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1050}}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Tambah Lokasi Objek Retribusi</h4>
              <small>Silakan isi formulir di bawah ini untuk menambahkan lokasi objek retribusi baru.</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="lokasiObjekRetribusi" className="form-label">
                    Nama Lokasi <span className="text-danger">*</span>
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
                  <div className="form-text">
                    Contoh: Pasar Sentral, Terminal Bus, Area Parkir Mall
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan
                  </label>
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    className="form-control"
                    value={formData.keterangan}
                    onChange={handleChange}
                    placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
                    rows={3}
                  />
                </div>

                <div className="d-flex gap-2">
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
