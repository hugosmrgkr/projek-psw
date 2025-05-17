import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const PermohonanSewaFormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormState = {
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: '',
    keterangan: ''
  };

  const [form, setForm] = useState(initialFormState);
  const [jenisPermohonanOptions, setJenisPermohonanOptions] = useState([]);
  const [tarifObjekRetribusiOptions, setTarifObjekRetribusiOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [jenisRes, tarifRes] = await Promise.all([
          axios.get('http://localhost:8000/api/jenis-permohonan'),
          axios.get('http://localhost:8000/api/tarif-objek-retribusi'),
        ]);
        setJenisPermohonanOptions(jenisRes.data.data || []);
        setTarifObjekRetribusiOptions(tarifRes.data.data || []);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      }
    };

    const fetchExistingData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/permohonan-sewa/${id}`);
        if (res.data && res.data.data) {
          const d = res.data.data;
          setForm({
            idJenisPermohonan: d.idJenisPermohonan || '',
            nomorSuratPermohonan: d.nomorSuratPermohonan || '',
            tanggalPengajuan: d.tanggalPengajuan || '',
            namaPemohon: d.namaPemohon || '',
            alamatPemohon: d.alamatPemohon || '',
            idTarifObjekRetribusi: d.idTarifObjekRetribusi || '',
            keterangan: d.keterangan || '',
          });
        } else {
          alert('Data tidak ditemukan');
          navigate('/permohonansewa');
        }
      } catch (error) {
        console.error("Error loading permohonan data:", error);
        alert('Gagal mengambil data permohonan.');
        navigate('/permohonansewa');
      }
    };

    fetchDropdowns();
    fetchExistingData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.put(`http://localhost:8000/api/permohonan-sewa/${id}`, form);
      navigate('/permohonansewa');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert('Terjadi kesalahan saat menyimpan data.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Edit Permohonan Sewa</h3>
      <form onSubmit={handleSubmit}>
        {/* Jenis Permohonan */}
        <div className="mb-3">
          <label htmlFor="idJenisPermohonan" className="form-label">Jenis Permohonan *</label>
          <select
            id="idJenisPermohonan"
            name="idJenisPermohonan"
            className={`form-select ${errors.idJenisPermohonan ? 'is-invalid' : ''}`}
            value={form.idJenisPermohonan}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Jenis Permohonan --</option>
            {jenisPermohonanOptions.map((opt) => (
              <option key={opt.idJenisPermohonan} value={opt.idJenisPermohonan}>
                {opt.jenisPermohonan}
              </option>
            ))}
          </select>
          {errors.idJenisPermohonan && <div className="invalid-feedback">{errors.idJenisPermohonan[0]}</div>}
        </div>

        {/* Nomor Surat Permohonan */}
        <div className="mb-3">
          <label htmlFor="nomorSuratPermohonan" className="form-label">Nomor Surat Permohonan *</label>
          <input
            type="text"
            id="nomorSuratPermohonan"
            name="nomorSuratPermohonan"
            className={`form-control ${errors.nomorSuratPermohonan ? 'is-invalid' : ''}`}
            value={form.nomorSuratPermohonan}
            onChange={handleChange}
            required
          />
          {errors.nomorSuratPermohonan && <div className="invalid-feedback">{errors.nomorSuratPermohonan[0]}</div>}
        </div>

        {/* Tanggal Pengajuan */}
        <div className="mb-3">
          <label htmlFor="tanggalPengajuan" className="form-label">Tanggal Pengajuan *</label>
          <input
            type="date"
            id="tanggalPengajuan"
            name="tanggalPengajuan"
            className={`form-control ${errors.tanggalPengajuan ? 'is-invalid' : ''}`}
            value={form.tanggalPengajuan}
            onChange={handleChange}
            required
          />
          {errors.tanggalPengajuan && <div className="invalid-feedback">{errors.tanggalPengajuan[0]}</div>}
        </div>

        {/* Nama Pemohon */}
        <div className="mb-3">
          <label htmlFor="namaPemohon" className="form-label">Nama Pemohon *</label>
          <input
            type="text"
            id="namaPemohon"
            name="namaPemohon"
            className={`form-control ${errors.namaPemohon ? 'is-invalid' : ''}`}
            value={form.namaPemohon}
            onChange={handleChange}
            required
          />
          {errors.namaPemohon && <div className="invalid-feedback">{errors.namaPemohon[0]}</div>}
        </div>

        {/* Alamat Pemohon */}
        <div className="mb-3">
          <label htmlFor="alamatPemohon" className="form-label">Alamat Pemohon *</label>
          <textarea
            id="alamatPemohon"
            name="alamatPemohon"
            className={`form-control ${errors.alamatPemohon ? 'is-invalid' : ''}`}
            rows={3}
            value={form.alamatPemohon}
            onChange={handleChange}
            required
          />
          {errors.alamatPemohon && <div className="invalid-feedback">{errors.alamatPemohon[0]}</div>}
        </div>

        {/* Tarif Objek Retribusi */}
        <div className="mb-3">
          <label htmlFor="idTarifObjekRetribusi" className="form-label">Tarif Objek Retribusi *</label>
          <select
            id="idTarifObjekRetribusi"
            name="idTarifObjekRetribusi"
            className={`form-select ${errors.idTarifObjekRetribusi ? 'is-invalid' : ''}`}
            value={form.idTarifObjekRetribusi}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Tarif --</option>
            {tarifObjekRetribusiOptions.map((opt) => (
              <option key={opt.idTarifObjekRetribusi} value={opt.idTarifObjekRetribusi}>
                Rp {opt.nominalTarif?.toLocaleString('id-ID')} - {opt.keterangan || '-'}
              </option>
            ))}
          </select>
          {errors.idTarifObjekRetribusi && <div className="invalid-feedback">{errors.idTarifObjekRetribusi[0]}</div>}
        </div>

        {/* Keterangan */}
        <div className="mb-3">
          <label htmlFor="keterangan" className="form-label">Keterangan (Opsional)</label>
          <textarea
            id="keterangan"
            name="keterangan"
            className="form-control"
            rows={3}
            value={form.keterangan}
            onChange={handleChange}
            placeholder="Tambahkan keterangan jika perlu"
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Link to="/permohonansewa" className="btn btn-outline-secondary">Batal</Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PermohonanSewaFormEdit;
