import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditJenisPermohonan() {
  const [form, setForm] = useState({ jenisPermohonan: '', keterangan: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jenis-permohonan/${id}`)
      .then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/jenis-permohonan/${id}`, form)
      .then(() => navigate('/jenis-permohonan'));
  };

  return (
    <>
      <h2>Edit Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="jenisPermohonan"
          value={form.jenisPermohonan}
          onChange={handleChange}
          placeholder="Jenis Permohonan"
        />
        <textarea
          name="keterangan"
          value={form.keterangan}
          onChange={handleChange}
          placeholder="Keterangan"
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditJenisPermohonan;
