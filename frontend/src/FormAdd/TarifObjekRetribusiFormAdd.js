import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const TarifObjekRetribusiFormAdd = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: ''
  });

  const [objekRetribusiList, setObjekRetribusiList] = useState([]);
  const [jenisJangkaWaktuList, setJenisJangkaWaktuList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Ambil data dropdown
    axios.get('http://localhost:8000/api/objek-retribusi')
      .then(res => setObjekRetribusiList(res.data.data))
      .catch(err => console.error('Gagal ambil data objek retribusi:', err));

    axios.get('http://localhost:8000/api/jenis-jangka-waktu')
      .then(res => setJenisJangkaWaktuList(res.data.data))
      .catch(err => console.error('Gagal ambil data jangka waktu:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/tarif-objek-retribusi', form);
      alert('Data berhasil ditambahkan.');
      navigate('/tarif');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert('Terjadi kesalahan saat menyimpan data.');
        console.error(error);
      }
    }
  };

  const styles = {
    container: { maxWidth: 600, margin: '0 auto', padding: 20 },
    form: { display: 'flex', flexDirection: 'column' },
    formGroup: { marginBottom: 15 },
    input: { width: '100%', padding: 8 },
    error: { color: 'red', marginTop: 5 },
    formActions: { display: 'flex', justifyContent: 'space-between' },
    saveButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none' },
    cancelButton: { padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', textDecoration: 'none' },
  };

  return (
    <div style={styles.container}>
      <h2>Tambah Tarif Objek Retribusi</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Objek Retribusi */}
        <div style={styles.formGroup}>
          <label>Objek Retribusi *</label>
          <select
            name="idObjekRetribusi"
            onChange={handleChange}
            value={form.idObjekRetribusi}
            required
            style={styles.input}
          >
            <option value="">-- Pilih Objek --</option>
            {objekRetribusiList.map(objek => (
              <option key={objek.idObjekRetribusi} value={objek.idObjekRetribusi}>
                {objek.kodeObjekRetribusi} - {objek.alamat}
              </option>
            ))}
          </select>
          {errors.idObjekRetribusi && <div style={styles.error}>{errors.idObjekRetribusi[0]}</div>}
        </div>

        {/* Jenis Jangka Waktu */}
        <div style={styles.formGroup}>
          <label>Jenis Jangka Waktu *</label>
          <select
            name="idJenisJangkaWaktu"
            onChange={handleChange}
            value={form.idJenisJangkaWaktu}
            required
            style={styles.input}
          >
            <option value="">-- Pilih Jangka Waktu --</option>
            {jenisJangkaWaktuList.map(jangka => (
              <option key={jangka.idJenisJangkaWaktu} value={jangka.idJenisJangkaWaktu}>
                {jangka.jenisJangkaWaktu}
              </option>
            ))}
          </select>
          {errors.idJenisJangkaWaktu && <div style={styles.error}>{errors.idJenisJangkaWaktu[0]}</div>}
        </div>

        {/* Tanggal Dinilai */}
        <div style={styles.formGroup}>
          <label>Tanggal Dinilai *</label>
          <input
            type="date"
            name="tanggalDinilai"
            onChange={handleChange}
            value={form.tanggalDinilai}
            required
            style={styles.input}
          />
          {errors.tanggalDinilai && <div style={styles.error}>{errors.tanggalDinilai[0]}</div>}
        </div>

        {/* Nama Penilai */}
        <div style={styles.formGroup}>
          <label>Nama Penilai *</label>
          <input
            type="text"
            name="namaPenilai"
            placeholder="Masukkan nama penilai"
            onChange={handleChange}
            value={form.namaPenilai}
            required
            style={styles.input}
          />
          {errors.namaPenilai && <div style={styles.error}>{errors.namaPenilai[0]}</div>}
        </div>

        {/* Nominal Tarif */}
        <div style={styles.formGroup}>
          <label>Nominal Tarif (Rp) *</label>
          <input
            type="number"
            name="nominalTarif"
            placeholder="Masukkan nominal tarif"
            onChange={handleChange}
            value={form.nominalTarif}
            required
            style={styles.input}
          />
          {errors.nominalTarif && <div style={styles.error}>{errors.nominalTarif[0]}</div>}
        </div>

        {/* Tombol Aksi */}
        <div style={styles.formActions}>
          <button type="submit" style={styles.saveButton}>💾 Simpan</button>
          <Link to="/tarif" style={styles.cancelButton}>✖ Batal</Link>
        </div>
      </form>
    </div>
  );
};

export default TarifObjekRetribusiFormAdd;
