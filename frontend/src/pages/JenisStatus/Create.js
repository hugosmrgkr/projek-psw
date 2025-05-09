import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JenisStatusAPI from '../../api/JenisStatus';

const CreateJenisStatus = () => {
  const [formData, setFormData] = useState({
    jenisStatus: '',
    keterangan: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await JenisStatusAPI.create(formData);
      alert('Jenis Status berhasil dibuat');
      navigate('/jenis-status');
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data); // ini yg penting
        setError(err.response.data.message || 'Gagal membuat Jenis Status.');
      } else {
        console.error('Error:', err.message);
        setError('Gagal membuat Jenis Status.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-4">
      <h3>Tambah Jenis Status</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Jenis Status</label>
          <input
            type="text"
            className="form-control"
            name="jenisStatus"
            value={formData.jenisStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Keterangan</label>
          <textarea
            className="form-control"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
};

export default CreateJenisStatus;
