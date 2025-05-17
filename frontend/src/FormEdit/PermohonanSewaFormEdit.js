import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const PermohonanSewaFormEdit = () => {
  const { id } = useParams(); // ambil id dari route param
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [jenisPermohonanOptions, setJenisPermohonanOptions] = useState([]);
  const [tarifObjekRetribusiOptions, setTarifObjekRetribusiOptions] = useState([]);

  const [form, setForm] = useState({
    idJenisPermohonan: '',
    nomorSuratPermohonan: '',
    tanggalPengajuan: '',
    namaPemohon: '',
    alamatPemohon: '',
    idTarifObjekRetribusi: '',
    keterangan: ''
  });

  // Ambil data pilihan dropdown dan data permohonan sewa yg diedit
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const jenisRes = await axios.get('http://localhost:8000/api/jenis-permohonan');
        setJenisPermohonanOptions(jenisRes.data.data || []);

        const tarifRes = await axios.get('http://localhost:8000/api/tarif-objek-retribusi');
        setTarifObjekRetribusiOptions(tarifRes.data.data || []);
      } catch (error) {
        console.error('Gagal memuat opsi:', error);
      }
    };

    const fetchPermohonan = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/permohonan-sewa/${id}`);
        if (res.data && res.data.data) {
          const data = res.data.data;
          setForm({
            idJenisPermohonan: data.idJenisPermohonan || '',
            nomorSuratPermohonan: data.nomorSuratPermohonan || '',
            tanggalPengajuan: data.tanggalPengajuan || '',
            namaPemohon: data.namaPemohon || '',
            alamatPemohon: data.alamatPemohon || '',
            idTarifObjekRetribusi: data.idTarifObjekRetribusi || '',
            keterangan: data.keterangan || ''
          });
        }
      } catch (error) {
        console.error('Gagal memuat data permohonan:', error);
        alert('Data permohonan tidak ditemukan.');
        navigate('/permohonansewa');
      }
    };

    fetchOptions();
    fetchPermohonan();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    try {
      await axios.put(`http://localhost:8000/api/permohonan-sewa/${id}`, form);
      setErrors({});
      navigate('/permohonansewa');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error submitting form:', error);
        alert('Gagal menyimpan data. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Edit Permohonan Sewa</h2>
        <Link to="/permohonansewa" className="btn btn-secondary">Kembali</Link>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                {/* Jenis Permohonan */}
                <div className="mb-3">
                  <label htmlFor="idJenisPermohonan" className="form-label">Jenis Permohonan *</label>
                  <select
                    id="idJenisPermohonan"
                    name="idJenisPermohonan"
                    value={form.idJenisPermohonan}
                    onChange={handleChange}
                    className={`form-select ${errors.idJenisPermohonan ? 'is-invalid' : ''}`}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Pilih Jenis Permohonan</option>
                    {jenisPermohonanOptions.map((option) => (
                      <option key={option.idJenisPermohonan || option.id} value={option.idJenisPermohonan || option.id}>
                        {option.jenisPermohonan}
                      </option>
                    ))}
                  </select>
                  {errors.idJenisPermohonan && <div className="invalid-feedback">{errors.idJenisPermohonan[0]}</div>}
                </div>

                {/* Nomor Surat */}
                <div className="mb-3">
                  <label className="form-label">Nomor Surat Permohonan</label>
                  <input
                    name="nomorSuratPermohonan"
                    className="form-control"
                    value={form.nomorSuratPermohonan}
                    onChange={handleChange}
                    required
                  />
                  {errors.nomorSuratPermohonan && <div className="invalid-feedback d-block">{errors.nomorSuratPermohonan[0]}</div>}
                </div>

                {/* Tanggal */}
                <div className="mb-3">
                  <label className="form-label">Tanggal Pengajuan</label>
                  <input
                    type="date"
                    name="tanggalPengajuan"
                    className="form-control"
                    value={form.tanggalPengajuan}
                    onChange={handleChange}
                    required
                  />
                  {errors.tanggalPengajuan && <div className="invalid-feedback d-block">{errors.tanggalPengajuan[0]}</div>}
                </div>
              </div>

              <div className="col-md-6">
                {/* Nama Pemohon */}
                <div className="mb-3">
                  <label className="form-label">Nama Pemohon</label>
                  <input
                    name="namaPemohon"
                    className="form-control"
                    value={form.namaPemohon}
                    onChange={handleChange}
                    required
                  />
                  {errors.namaPemohon && <div className="invalid-feedback d-block">{errors.namaPemohon[0]}</div>}
                </div>

                {/* Alamat Pemohon */}
                <div className="mb-3">
                  <label className="form-label">Alamat Pemohon</label>
                  <textarea
                    name="alamatPemohon"
                    className="form-control"
                    value={form.alamatPemohon}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.alamatPemohon && <div className="invalid-feedback d-block">{errors.alamatPemohon[0]}</div>}
                </div>
              </div>
            </div>

            {/* Tarif dan Keterangan */}
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Tarif Objek Retribusi</label>
                  <select
                    name="idTarifObjekRetribusi"
                    value={form.idTarifObjekRetribusi}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Pilih Tarif Objek</option>
                    {tarifObjekRetribusiOptions.map((option) => (
                      <option
                        key={option.idTarifObjekRetribusi}
                        value={option.idTarifObjekRetribusi}
                      >
                        Rp {option.nominalTarif?.toLocaleString('id-ID')} - {option.namaPenilai || option.keterangan || '-'}
                      </option>
                    ))}
                  </select>
                  {errors.idTarifObjekRetribusi && <div className="invalid-feedback d-block">{errors.idTarifObjekRetribusi[0]}</div>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Keterangan</label>
                  <textarea
                    name="keterangan"
                    className="form-control"
                    value={form.keterangan}
                    onChange={handleChange}
                    placeholder="Opsional"
                  ></textarea>
                  {errors.keterangan && <div className="invalid-feedback d-block">{errors.keterangan[0]}</div>}
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default PermohonanSewaFormEdit;
