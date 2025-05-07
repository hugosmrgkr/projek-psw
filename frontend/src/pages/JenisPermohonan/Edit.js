import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditJenisPermohonan() {
  const [form, setForm] = useState({ nama_jenis_permohonan: '', keterangan: '' });
  const [error, setError] = useState(null); // Untuk menyimpan pesan error
  const [loading, setLoading] = useState(true); // Status loading
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data untuk form edit
    axios.get(`http://localhost:8000/api/jenis-permohonan/${id}`)
      .then(res => {
        // Sesuaikan data yang diterima agar bisa ditampilkan di form
        setForm(res.data);
        setLoading(false); // Set loading false setelah data diterima
      })
      .catch(err => {
        setError("Terjadi masalah saat memuat data.");
        setLoading(false);
      });
  }, [id]);

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

    // Kirim data yang telah diubah ke backend
    axios.put(`http://localhost:8000/api/jenis-permohonan/${id}`, form)
      .then(() => navigate('/jenis-permohonan')) // Setelah berhasil, navigasi ke halaman list
      .catch((err) => {
        // Tangani error jika ada masalah saat mengirim data
        if (err.response && err.response.data) {
          setError(err.response.data.error || "Terjadi kesalahan pada server.");
        } else {
          setError("Terjadi masalah dengan koneksi.");
        }
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading jika data sedang dimuat
  }

  return (
    <>
      <h2>Edit Jenis Permohonan</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nama_jenis_permohonan" // Sesuaikan dengan nama kolom di database
          value={form.nama_jenis_permohonan} // Menggunakan nama yang benar sesuai backend
          onChange={handleChange}
          placeholder="Nama Jenis Permohonan"
        />
        <textarea
          name="keterangan"
          value={form.keterangan}
          onChange={handleChange}
          placeholder="Keterangan"
        ></textarea>
        <button type="submit">Update</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Menampilkan error jika ada */}
    </>
  );
}

export default EditJenisPermohonan;
