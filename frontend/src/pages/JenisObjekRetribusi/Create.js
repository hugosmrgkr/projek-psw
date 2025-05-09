import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateJenisObjekRetribusi() {
  const [form, setForm] = useState({
    jenisObjekRetribusi: '',
    keterangan: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.jenisObjekRetribusi) {
      setError("Jenis Objek Retribusi wajib diisi.");
      return;
    }

    setError(null);

    try {
      await axios.post('http://localhost:8000/api/jenis-objek-retribusi', {
        jenisObjekRetribusi: form.jenisObjekRetribusi,
        keterangan: form.keterangan
      });

      navigate('/jenis-objek-retribusi');
    } catch (err) {
      console.error('Error Response:', err.response?.data);
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError("Terjadi kesalahan pada server.");
      }
    }
  };

  return (
    <>
      <h2>Tambah Jenis Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="jenisObjekRetribusi"
          placeholder="Jenis Objek Retribusi"
          value={form.jenisObjekRetribusi}
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

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </>
  );
}

export default CreateJenisObjekRetribusi;
