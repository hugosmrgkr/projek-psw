import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditJangkaWaktuSewa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    idJenisJangkaWaktu: '',
    jangkaWaktu: '',
    keterangan: '',
    isDefault: '0',
  });
  const [error, setError] = useState(null);

  // Ambil data lama saat pertama load
  useEffect(() => {
    axios.get(`http://localhost:8000/api/jangka-waktu-sewa/${id}`)
      .then((res) => {
        if (res.data) {
          setForm({
            idJenisJangkaWaktu: res.data.idJenisJangkaWaktu?.toString() || '',
            jangkaWaktu: res.data.jangkaWaktu || '',
            keterangan: res.data.keterangan || '',
            isDefault: res.data.isDefault ? '1' : '0',
          });
        } else {
          alert('Data tidak ditemukan.');
          navigate('/jangka-waktu-sewa');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Gagal memuat data.');
        navigate('/jangka-waktu-sewa');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!form.idJenisJangkaWaktu || !form.jangkaWaktu) {
      setError("ID Jenis Jangka Waktu dan Jangka Waktu wajib diisi.");
      return;
    }

    setError(null);

    try {
      await axios.put(`http://localhost:8000/api/jangka-waktu-sewa/${id}`, {
        idJenisJangkaWaktu: parseInt(form.idJenisJangkaWaktu),
        jangkaWaktu: form.jangkaWaktu,
        keterangan: form.keterangan,
        isDefault: form.isDefault === '1' ? 1 : 0,
      });

      navigate('/jangka-waktu-sewa');
    } catch (err) {
      console.error('Error Response:', err.response?.data);
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError("Terjadi kesalahan saat memperbarui data.");
      }
    }
  };

  return (
    <>
      <h2>Edit Jangka Waktu Sewa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="idJenisJangkaWaktu"
          placeholder="ID Jenis Jangka Waktu"
          value={form.idJenisJangkaWaktu}
          onChange={handleChange}
        />
        <input
          name="jangkaWaktu"
          placeholder="Jangka Waktu"
          value={form.jangkaWaktu}
          onChange={handleChange}
        />
        <textarea
          name="keterangan"
          placeholder="Keterangan"
          value={form.keterangan}
          onChange={handleChange}
        />
        <select
          name="isDefault"
          value={form.isDefault}
          onChange={handleChange}
        >
          <option value="0">Tidak Default</option>
          <option value="1">Default</option>
        </select>
        <button type="submit">Update</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </>
  );
}

export default EditJangkaWaktuSewa;
