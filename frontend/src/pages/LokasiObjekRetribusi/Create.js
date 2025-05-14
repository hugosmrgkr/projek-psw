import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateLokasi() {
  const [form, setForm] = useState({ lokasiObjekRetribusi: '', keterangan: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.lokasiObjekRetribusi) {
      setError("Lokasi wajib diisi.");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/lokasi-objek-retribusi', form);
      navigate('/lokasi-objek-retribusi');
    } catch (err) {
      setError("Gagal menyimpan data.");
    }
  };

  return (
    <>
      <h2>Tambah Lokasi Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="lokasiObjekRetribusi"
          placeholder="Lokasi"
          value={form.lokasiObjekRetribusi}
          onChange={handleChange}
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
    </>
  );
}

export default CreateLokasi;
