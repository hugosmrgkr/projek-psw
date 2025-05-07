import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../../api/JenisJangkaWaktu';

const Create = () => {
  const [form, setForm] = useState({ jenisJangkaWaktu: '', keterangan: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create(form);
      navigate('/jenis-jangka-waktu');
    } catch (err) {
      setError("Gagal menyimpan data.");
    }
  };

  return (
    <div>
      <h2>Tambah Jenis Jangka Waktu</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="jenisJangkaWaktu"
          placeholder="Jenis Jangka Waktu"
          value={form.jenisJangkaWaktu}
          onChange={handleChange}
          required
        />
        <textarea
          name="keterangan"
          placeholder="Keterangan"
          value={form.keterangan}
          onChange={handleChange}
        />
        <button type="submit">Simpan</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Create;