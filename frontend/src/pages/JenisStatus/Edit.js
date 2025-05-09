import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JenisStatusAPI from '../../api/JenisStatus';

const EditJenisStatus = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jenisStatus: '',
    keterangan: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await JenisStatusAPI.getById(id);
        setFormData({
          jenisStatus: data.jenisStatus,
          keterangan: data.keterangan || ''
        });
      } catch (err) {
        setError('Gagal memuat data.');
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await JenisStatusAPI.update(id, formData);
      alert('Jenis Status berhasil diupdate');
      navigate('/jenis-status');
    } catch (err) {
      setError('Gagal mengupdate Jenis Status.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Jenis Status</h3>
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
          {loading ? 'Menyimpan...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditJenisStatus;
