import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateJenisPermohonan() {
  const [form, setForm] = useState({ jenisPermohonan: '', keterangan: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/jenis-permohonan', form)
      .then(() => navigate('/jenis-permohonan'));
  };

  return (
    <>
      <h2>Tambah Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="jenisPermohonan"
          placeholder="Jenis Permohonan"
          value={form.jenisPermohonan}
          onChange={handleChange}
        />
        <textarea
          name="keterangan"
          placeholder="Keterangan"
          value={form.keterangan}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Simpan</button>
      </form>
    </>
  );
}

export default CreateJenisPermohonan;
