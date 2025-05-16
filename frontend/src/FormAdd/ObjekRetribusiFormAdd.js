import React, { useState } from 'react';
import axios from 'axios';

function FormAddObjekRetribusi({ onSuccess }) {
  const [formData, setFormData] = useState({
    idLokasiObjekRetribusi: '',
    idJenisObjekRetribusi: '',
    kodeObjekRetribusi: '',
    noBangunan: '',
    jumlahLantai: 1,
    objekRetribusi: '',
    panjangTanah: 0,
    lebarTanah: 0,
    luasTanah: 0,
    panjangBangunan: 0,
    lebarBangunan: 0,
    luasBangunan: 0,
    alamat: '',
    latitude: '',
    longitude: '',
    keterangan: '',
    gambarDenahTanah: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Otomatis hitung luas tanah dan luas bangunan
      if (name === 'panjangTanah' || name === 'lebarTanah') {
        const panjang = name === 'panjangTanah' ? parseFloat(value) : parseFloat(formData.panjangTanah);
        const lebar = name === 'lebarTanah' ? parseFloat(value) : parseFloat(formData.lebarTanah);

        // Pastikan nilai valid sebelum melakukan perhitungan
        if (!isNaN(panjang) && !isNaN(lebar)) {
          newData.luasTanah = panjang * lebar;
        }
      }

      if (name === 'panjangBangunan' || name === 'lebarBangunan') {
        const panjang = name === 'panjangBangunan' ? parseFloat(value) : parseFloat(formData.panjangBangunan);
        const lebar = name === 'lebarBangunan' ? parseFloat(value) : parseFloat(formData.lebarBangunan);

        // Pastikan nilai valid sebelum melakukan perhitungan
        if (!isNaN(panjang) && !isNaN(lebar)) {
          newData.luasBangunan = panjang * lebar;
        }
      }

      return newData;
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.kodeObjekRetribusi) formErrors.kodeObjekRetribusi = "Kode objek retribusi harus diisi";
    if (!formData.objekRetribusi) formErrors.objekRetribusi = "Nama objek harus diisi";
    if (!formData.alamat) formErrors.alamat = "Alamat harus diisi";

    // Cek validasi untuk nilai numeric
    if (formData.panjangTanah <= 0) formErrors.panjangTanah = "Panjang tanah harus lebih besar dari 0";
    if (formData.lebarTanah <= 0) formErrors.lebarTanah = "Lebar tanah harus lebih besar dari 0";
    if (formData.panjangBangunan <= 0) formErrors.panjangBangunan = "Panjang bangunan harus lebih besar dari 0";
    if (formData.lebarBangunan <= 0) formErrors.lebarBangunan = "Lebar bangunan harus lebih besar dari 0";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Mengembalikan true jika tidak ada error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Hentikan jika ada error
    }

    try {
      await axios.post('http://localhost:8000/api/objek-retribusi', formData);
      alert('Data berhasil ditambahkan!');
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();  // Panggil onSuccess jika didefinisikan dengan benar
      }
    } catch (err) {
      console.error('Gagal menambahkan data:', err);
      alert('Terjadi kesalahan saat menambahkan data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>
        Kode Objek Retribusi:
        <input name="kodeObjekRetribusi" value={formData.kodeObjekRetribusi} onChange={handleChange} />
        {errors.kodeObjekRetribusi && <p style={{ color: 'red' }}>{errors.kodeObjekRetribusi}</p>}
      </label>
      <label>
        Nama Objek:
        <input name="objekRetribusi" value={formData.objekRetribusi} onChange={handleChange} />
        {errors.objekRetribusi && <p style={{ color: 'red' }}>{errors.objekRetribusi}</p>}
      </label>
      <label>
        No Bangunan:
        <input name="noBangunan" value={formData.noBangunan} onChange={handleChange} />
      </label>
      <label>
        Jumlah Lantai:
        <input name="jumlahLantai" type="number" value={formData.jumlahLantai} onChange={handleChange} />
      </label>
      <label>
        Panjang Tanah:
        <input name="panjangTanah" type="number" value={formData.panjangTanah} onChange={handleChange} />
        {errors.panjangTanah && <p style={{ color: 'red' }}>{errors.panjangTanah}</p>}
      </label>
      <label>
        Lebar Tanah:
        <input name="lebarTanah" type="number" value={formData.lebarTanah} onChange={handleChange} />
        {errors.lebarTanah && <p style={{ color: 'red' }}>{errors.lebarTanah}</p>}
      </label>
      <label>
        Luas Tanah:
        <input name="luasTanah" type="number" value={formData.luasTanah} readOnly />
      </label>
      <label>
        Panjang Bangunan:
        <input name="panjangBangunan" type="number" value={formData.panjangBangunan} onChange={handleChange} />
        {errors.panjangBangunan && <p style={{ color: 'red' }}>{errors.panjangBangunan}</p>}
      </label>
      <label>
        Lebar Bangunan:
        <input name="lebarBangunan" type="number" value={formData.lebarBangunan} onChange={handleChange} />
        {errors.lebarBangunan && <p style={{ color: 'red' }}>{errors.lebarBangunan}</p>}
      </label>
      <label>
        Luas Bangunan:
        <input name="luasBangunan" type="number" value={formData.luasBangunan} readOnly />
      </label>
      <label>
        Alamat:
        <input name="alamat" value={formData.alamat} onChange={handleChange} />
        {errors.alamat && <p style={{ color: 'red' }}>{errors.alamat}</p>}
      </label>
      <label>
        ID Jenis Objek Retribusi:
        <input name="idJenisObjekRetribusi" value={formData.idJenisObjekRetribusi} onChange={handleChange} />
      </label>
      <label>
        ID Lokasi Objek Retribusi:
        <input name="idLokasiObjekRetribusi" value={formData.idLokasiObjekRetribusi} onChange={handleChange} />
      </label>
      <button type="submit">Tambah</button>
    </form>
  );
}

export default FormAddObjekRetribusi;
