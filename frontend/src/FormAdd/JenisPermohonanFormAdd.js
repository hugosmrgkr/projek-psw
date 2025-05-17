import React, { useState } from "react";

const CreatePostForm = () => {
  const [form, setForm] = useState({ 
    jenisPermohonan: "", 
    parentId: "", 
    keterangan: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const jenisPermohonanOptions = [
    "Permohonan Baru",
    "Perpanjangan",
    "Pembaharuan"
  ];

  const getAuthToken = () => localStorage.getItem('auth_token');

  const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");
    
    const newErrors = {};
    if (!form.jenisPermohonan) {
      newErrors.jenisPermohonan = ["Jenis permohonan harus diisi"];
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      
      const authToken = getAuthToken();
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      
      const csrfToken = getCsrfToken();
      if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken;

      const formData = {
        ...form,
        parentId: form.parentId ? parseInt(form.parentId) : null
      };

      const response = await fetch('http://localhost:8000/api/jenis-permohonan', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
        credentials: 'include' 
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401 || response.status === 403) {
          alert("Sesi Anda telah berakhir. Silakan login kembali.");
          window.location.href = "/login";
          return;
        }
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          throw new Error(errorData.message || "Terjadi kesalahan saat menyimpan data");
        }
      } else {
        const data = await response.json();
        setSuccessMessage("Data berhasil ditambahkan!");
        setForm({ jenisPermohonan: "", parentId: "", keterangan: "" });
        console.log("Data berhasil disimpan:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '720px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <span className="me-2" style={{ fontSize: '1.3rem' }}>📝</span>
          <h5 className="mb-0">Tambah Jenis Permohonan</h5>
        </div>

        {successMessage && (
          <div className="alert alert-success d-flex align-items-center m-3" role="alert">
            <span className="me-2" style={{ fontSize: '1.2rem' }}>✓</span>
            {successMessage}
          </div>
        )}

        <form className="card-body" onSubmit={handleSubmit} noValidate>
          {/* Jenis Permohonan */}
          <div className="mb-3">
            <label htmlFor="jenisPermohonan" className="form-label">
              Jenis Permohonan <span className="text-danger">*</span>
            </label>
            <select
              id="jenisPermohonan"
              name="jenisPermohonan"
              className={`form-select ${errors.jenisPermohonan ? 'is-invalid' : ''}`}
              value={form.jenisPermohonan}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Pilih Jenis Permohonan</option>
              {jenisPermohonanOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.jenisPermohonan && (
              <div className="invalid-feedback">{errors.jenisPermohonan[0]}</div>
            )}
          </div>

          {/* Parent ID */}
          <div className="mb-3">
            <label htmlFor="parentId" className="form-label">Parent ID</label>
            <input
              type="number"
              id="parentId"
              name="parentId"
              className={`form-control ${errors.parentId ? 'is-invalid' : ''}`}
              value={form.parentId}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Masukkan ID Parent (opsional)"
            />
            {errors.parentId && (
              <div className="invalid-feedback">{errors.parentId[0]}</div>
            )}
          </div>

          {/* Keterangan */}
          <div className="mb-3">
            <label htmlFor="keterangan" className="form-label">Keterangan</label>
            <textarea
              id="keterangan"
              name="keterangan"
              className={`form-control ${errors.keterangan ? 'is-invalid' : ''}`}
              value={form.keterangan}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Masukkan keterangan atau deskripsi tambahan (opsional)"
              rows={4}
            />
            {errors.keterangan && (
              <div className="invalid-feedback">{errors.keterangan[0]}</div>
            )}
          </div>

          {/* Info box */}
          <div className="alert alert-info" role="alert">
            <h6 className="alert-heading">Informasi Pengisian:</h6>
            <ul className="mb-0 ps-3">
              <li>Jenis Permohonan hanya dapat diisi dengan: <strong>Permohonan Baru</strong>, <strong>Perpanjangan</strong>, atau <strong>Pembaharuan</strong></li>
              <li>Parent ID bersifat opsional dan harus berupa angka</li>
              <li>Keterangan bersifat opsional</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-success d-flex align-items-center"
              disabled={isSubmitting}
            >
              <span className="me-2">💾</span>
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </button>
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center"
              disabled={isSubmitting}
              onClick={() => window.history.back()}
            >
              <span className="me-2">❌</span>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
