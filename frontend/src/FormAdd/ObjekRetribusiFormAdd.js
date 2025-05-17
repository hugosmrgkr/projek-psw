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

      if (name === 'panjangTanah' || name === 'lebarTanah') {
        const panjang = name === 'panjangTanah' ? parseFloat(value) : parseFloat(formData.panjangTanah);
        const lebar = name === 'lebarTanah' ? parseFloat(value) : parseFloat(formData.lebarTanah);
        if (!isNaN(panjang) && !isNaN(lebar)) {
          newData.luasTanah = panjang * lebar;
        }
      }

      if (name === 'panjangBangunan' || name === 'lebarBangunan') {
        const panjang = name === 'panjangBangunan' ? parseFloat(value) : parseFloat(formData.panjangBangunan);
        const lebar = name === 'lebarBangunan' ? parseFloat(value) : parseFloat(formData.lebarBangunan);
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

    if (formData.panjangTanah <= 0) formErrors.panjangTanah = "Panjang tanah harus lebih besar dari 0";
    if (formData.lebarTanah <= 0) formErrors.lebarTanah = "Lebar tanah harus lebih besar dari 0";
    if (formData.panjangBangunan <= 0) formErrors.panjangBangunan = "Panjang bangunan harus lebih besar dari 0";
    if (formData.lebarBangunan <= 0) formErrors.lebarBangunan = "Lebar bangunan harus lebih besar dari 0";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8000/api/objek-retribusi', formData);
      alert('Data berhasil ditambahkan!');
      if (onSuccess && typeof onSuccess === 'function') onSuccess();
    } catch (err) {
      console.error('Gagal menambahkan data:', err);
      alert('Terjadi kesalahan saat menambahkan data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">
            Kode Objek Retribusi:
            <input
              name="kodeObjekRetribusi"
              value={formData.kodeObjekRetribusi}
              onChange={handleChange}
              className={`form-control ${errors.kodeObjekRetribusi ? 'is-invalid' : ''}`}
            />
            {errors.kodeObjekRetribusi && <div className="invalid-feedback">{errors.kodeObjekRetribusi}</div>}
          </label>

          <label className="form-label mt-3">
            Nama Objek:
            <input
              name="objekRetribusi"
              value={formData.objekRetribusi}
              onChange={handleChange}
              className={`form-control ${errors.objekRetribusi ? 'is-invalid' : ''}`}
            />
            {errors.objekRetribusi && <div className="invalid-feedback">{errors.objekRetribusi}</div>}
          </label>

          <label className="form-label mt-3">
            No Bangunan:
            <input
              name="noBangunan"
              value={formData.noBangunan}
              onChange={handleChange}
              className="form-control"
            />
          </label>

          <label className="form-label mt-3">
            Jumlah Lantai:
            <input
              type="number"
              name="jumlahLantai"
              value={formData.jumlahLantai}
              onChange={handleChange}
              className="form-control"
              min="1"
            />
          </label>

          <label className="form-label mt-3">
            Panjang Tanah:
            <input
              type="number"
              name="panjangTanah"
              value={formData.panjangTanah}
              onChange={handleChange}
              className={`form-control ${errors.panjangTanah ? 'is-invalid' : ''}`}
              min="0"
            />
            {errors.panjangTanah && <div className="invalid-feedback">{errors.panjangTanah}</div>}
          </label>

          <label className="form-label mt-3">
            Lebar Tanah:
            <input
              type="number"
              name="lebarTanah"
              value={formData.lebarTanah}
              onChange={handleChange}
              className={`form-control ${errors.lebarTanah ? 'is-invalid' : ''}`}
              min="0"
            />
            {errors.lebarTanah && <div className="invalid-feedback">{errors.lebarTanah}</div>}
          </label>

          <label className="form-label mt-3">
            Luas Tanah:
            <input
              type="number"
              name="luasTanah"
              value={formData.luasTanah}
              readOnly
              className="form-control"
            />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Panjang Bangunan:
            <input
              type="number"
              name="panjangBangunan"
              value={formData.panjangBangunan}
              onChange={handleChange}
              className={`form-control ${errors.panjangBangunan ? 'is-invalid' : ''}`}
              min="0"
            />
            {errors.panjangBangunan && <div className="invalid-feedback">{errors.panjangBangunan}</div>}
          </label>

          <label className="form-label mt-3">
            Lebar Bangunan:
            <input
              type="number"
              name="lebarBangunan"
              value={formData.lebarBangunan}
              onChange={handleChange}
              className={`form-control ${errors.lebarBangunan ? 'is-invalid' : ''}`}
              min="0"
            />
            {errors.lebarBangunan && <div className="invalid-feedback">{errors.lebarBangunan}</div>}
          </label>

          <label className="form-label mt-3">
            Luas Bangunan:
            <input
              type="number"
              name="luasBangunan"
              value={formData.luasBangunan}
              readOnly
              className="form-control"
            />
          </label>

          <label className="form-label mt-3">
            Alamat:
            <input
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={`form-control ${errors.alamat ? 'is-invalid' : ''}`}
            />
            {errors.alamat && <div className="invalid-feedback">{errors.alamat}</div>}
          </label>

          <label className="form-label mt-3">
            ID Jenis Objek Retribusi:
            <input
              name="idJenisObjekRetribusi"
              value={formData.idJenisObjekRetribusi}
              onChange={handleChange}
              className="form-control"
            />
          </label>

          <label className="form-label mt-3">
            ID Lokasi Objek Retribusi:
            <input
              name="idLokasiObjekRetribusi"
              value={formData.idLokasiObjekRetribusi}
              onChange={handleChange}
              className="form-control"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Tambah
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Kembali
        </button>
      </div>
    </form>
  );
}

export default FormAddObjekRetribusi;
