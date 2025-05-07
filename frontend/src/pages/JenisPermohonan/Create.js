import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateJenisPermohonan() {
  const [form, setForm] = useState({ nama_jenis_permohonan: '', keterangan: '' });
  const [error, setError] = useState(null); // Untuk menyimpan pesan error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!form.nama_jenis_permohonan) {
      setError("Nama Jenis Permohonan wajib diisi");
      return; // Jangan lanjutkan jika ada error
    }

    // Reset error jika valid
    setError(null);

    // Kirim data ke backend
    axios.post('http://localhost:8000/api/jenis-permohonan', form)
      .then(() => {
        // Navigasi ke halaman jenis permohonan setelah berhasil
        navigate('/jenis-permohonan');
      })
      .catch((err) => {
        // Tangani error jika terjadi masalah saat mengirim data
        if (err.response && err.response.data) {
          setError(err.response.data.error || "Terjadi kesalahan pada server.");
        } else {
          setError("Terjadi masalah dengan koneksi.");
        }
      });
  };

  return (
    <>
      <h2>Tambah Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nama_jenis_permohonan" // Ubah ini agar sesuai dengan API
          placeholder="Nama Jenis Permohonan"
          value={form.nama_jenis_permohonan}
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

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
}

export default CreateJenisPermohonan;
