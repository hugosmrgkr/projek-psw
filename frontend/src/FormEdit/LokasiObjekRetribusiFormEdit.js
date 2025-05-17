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
        navigate('/lokasiobjekretribusi');
      })
      .catch(error => {
        console.error('Gagal memperbarui:', error);
        alert('Gagal memperbarui data.');
      });
  };

  const handleCancel = () => {
    navigate('/lokasiobjekretribusi');
  };

  if (isLoading) return <div className="container mt-4">Memuat data...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Edit Lokasi Objek Retribusi</h4>
              <small>Silakan edit formulir di bawah ini untuk memperbarui lokasi objek retribusi.</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="lokasiObjekRetribusi" className="form-label">
                    Nama Lokasi <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lokasiObjekRetribusi"
                    className="form-control"
                    value={formData.lokasiObjekRetribusi || ''}
                    onChange={(e) => setFormData({ ...formData, lokasiObjekRetribusi: e.target.value })}
                    placeholder="Masukkan nama lokasi"
                    required
                  />
                  <div className="form-text">
                    Contoh: Pasar Sentral, Terminal Bus, Area Parkir Mall
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="keterangan" className="form-label">Keterangan</label>
                  <textarea
                    id="keterangan"
                    className="form-control"
                    value={formData.keterangan || ''}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
                    rows={3}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <span role="img" aria-label="save" className="me-1">💾</span> Simpan Perubahan
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    <span role="img" aria-label="cancel" className="me-1">✖️</span> Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LokasiObjekRetribusiFormEdit;
