import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditLokasi() {
  const [form, setForm] = useState({ lokasiObjekRetribusi: '', keterangan: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Gagal memuat data."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/lokasi-objek-retribusi/${id}`, form);
      navigate('/lokasi-objek-retribusi');
    } catch {
      setError("Gagal mengupdate data.");
    }
  };

  return (
    <>
      <h2>Edit Lokasi Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="lokasiObjekRetribusi"
          value={form.lokasiObjekRetribusi}
          onChange={handleChange}
        />
        <textarea
          name="keterangan"
          value={form.keterangan}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default EditLokasi;
