import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormEditObjekRetribusi({ id, onSuccess }) {
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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/objek-retribusi/${id}`)
      .then((res) => {
        setFormData({
          idLokasiObjekRetribusi: res.data.data.idLokasiObjekRetribusi,
          idJenisObjekRetribusi: res.data.data.idJenisObjekRetribusi,
          kodeObjekRetribusi: res.data.data.kodeObjekRetribusi,
          noBangunan: res.data.data.noBangunan,
          jumlahLantai: res.data.data.jumlahLantai,
          objekRetribusi: res.data.data.objekRetribusi,
          panjangTanah: res.data.data.panjangTanah,
          lebarTanah: res.data.data.lebarTanah,
          luasTanah: res.data.data.luasTanah,
          panjangBangunan: res.data.data.panjangBangunan,
          lebarBangunan: res.data.data.lebarBangunan,
          luasBangunan: res.data.data.luasBangunan,
          alamat: res.data.data.alamat,
          latitude: res.data.data.latitude,
          longitude: res.data.data.longitude,
          keterangan: res.data.data.keterangan,
          gambarDenahTanah: res.data.data.gambarDenahTanah
        });
      })
      .catch((err) => console.error('Gagal mengambil data:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Otomatis hitung luas tanah dan luas bangunan
      if (name === 'panjangTanah' || name === 'lebarTanah') {
        const panjang = name === 'panjangTanah' ? value : formData.panjangTanah;
        const lebar = name === 'lebarTanah' ? value : formData.lebarTanah;
        newData.luasTanah = parseFloat(panjang) * parseFloat(lebar);
      }

      if (name === 'panjangBangunan' || name === 'lebarBangunan') {
        const panjang = name === 'panjangBangunan' ? value : formData.panjangBangunan;
        const lebar = name === 'lebarBangunan' ? value : formData.lebarBangunan;
        newData.luasBangunan = parseFloat(panjang) * parseFloat(lebar);
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/objek-retribusi/${id}`, formData);
      alert('Data berhasil diperbarui!');
      onSuccess();
    } catch (err) {
      console.error('Gagal memperbarui data:', err);
      alert('Terjadi kesalahan saat memperbarui data.');
    }
  };

  if (!formData) return <p>Memuat data...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>
        Kode Objek Retribusi:
        <input name="kodeObjekRetribusi" value={formData.kodeObjekRetribusi} onChange={handleChange} required />
      </label>
      <label>
        Nama Objek:
        <input name="objekRetribusi" value={formData.objekRetribusi} onChange={handleChange} required />
      </label>
      <label>
        No Bangunan:
        <input name="noBangunan" value={formData.noBangunan} onChange={handleChange} />
      </label>
      <label>
        Jumlah Lantai:
        <input name="jumlahLantai" type="number" value={formData.jumlahLantai} onChange={handleChange} required />
      </label>
      <label>
        Panjang Tanah:
        <input name="panjangTanah" type="number" value={formData.panjangTanah} onChange={handleChange} required />
      </label>
      <label>
        Lebar Tanah:
        <input name="lebarTanah" type="number" value={formData.lebarTanah} onChange={handleChange} required />
      </label>
      <label>
        Luas Tanah:
        <input name="luasTanah" type="number" value={formData.luasTanah} readOnly />
      </label>
      <label>
        Panjang Bangunan:
        <input name="panjangBangunan" type="number" value={formData.panjangBangunan} onChange={handleChange} required />
      </label>
      <label>
        Lebar Bangunan:
        <input name="lebarBangunan" type="number" value={formData.lebarBangunan} onChange={handleChange} required />
      </label>
      <label>
        Luas Bangunan:
        <input name="luasBangunan" type="number" value={formData.luasBangunan} readOnly />
      </label>
      <label>
        Alamat:
        <input name="alamat" value={formData.alamat} onChange={handleChange} required />
      </label>
      <label>
        ID Jenis Objek Retribusi:
        <input name="idJenisObjekRetribusi" value={formData.idJenisObjekRetribusi} onChange={handleChange} required />
      </label>
      <label>
        ID Lokasi Objek Retribusi:
        <input name="idLokasiObjekRetribusi" value={formData.idLokasiObjekRetribusi} onChange={handleChange} required />
      </label>
      <label>
        Latitude:
        <input name="latitude" value={formData.latitude} onChange={handleChange} />
      </label>
      <label>
        Longitude:
        <input name="longitude" value={formData.longitude} onChange={handleChange} />
      </label>
      <label>
        Keterangan:
        <textarea name="keterangan" value={formData.keterangan} onChange={handleChange} />
      </label>
      <label>
        Gambar Denah Tanah (URL):
        <input name="gambarDenahTanah" value={formData.gambarDenahTanah} onChange={handleChange} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default FormEditObjekRetribusi;
