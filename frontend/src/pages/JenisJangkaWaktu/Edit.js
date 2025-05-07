import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, update } from '../../api/JenisJangkaWaktu';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ jenisJangkaWaktu: '', keterangan: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getById(id);
        setForm({
          jenisJangkaWaktu: res.jenisJangkaWaktu || '',
          keterangan: res.keterangan || ''
        });
      } catch (err) {
        setError("Gagal memuat data.");
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(id, form);
      navigate('/jenis-jangka-waktu');
    } catch (err) {
      setError("Gagal memperbarui data.");
    }
  };

  return (
    <div>
      <h2>Edit Jenis Jangka Waktu</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="jenisJangkaWaktu"
          value={form.jenisJangkaWaktu}
          onChange={handleChange}
          required
        />
        <textarea
          name="keterangan"
          value={form.keterangan}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Edit;