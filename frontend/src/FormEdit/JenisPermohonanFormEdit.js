import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const EditPostForm = () => {
  const [form, setForm] = useState({
    jenisPermohonan: "",
    parentId: "",
    keterangan: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const jenisPermohonanOptions = [
    "Permohonan Baru",
    "Perpanjangan",
    "Pembaharuan"
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/${id}`)
        .then((res) => {
          const data = res.data.data;
          setForm({
            jenisPermohonan: data.jenisPermohonan || "",
            parentId: data.parentId || "",
            keterangan: data.keterangan || "",
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal memuat data:", error);
          alert("Data tidak ditemukan atau gagal diambil dari server.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setUpdating(true);

    axios
      .put(`${API}/${id}`, form)
      .then(() => {
        alert("Data berhasil diperbarui.");
        navigate("/jenispermohonan");
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error("Gagal update data:", error);
          alert("Terjadi kesalahan saat menyimpan data.");
        }
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Memuat data...</p>
      </div>
    );

  return (
    <div className="container my-5" style={{ maxWidth: "750px" }}>
      <h3 className="mb-4 fw-bold text-success">Edit Jenis Permohonan</h3>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item"><a href="/jenispermohonan">Jenis Permohonan</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            {/* Jenis Permohonan */}
            <div className="mb-3">
              <label htmlFor="jenisPermohonan" className="form-label fw-semibold">
                Jenis Permohonan <span className="text-danger">*</span>
              </label>
              <select
                name="jenisPermohonan"
                id="jenisPermohonan"
                className={`form-select ${errors.jenisPermohonan ? "is-invalid" : ""}`}
                value={form.jenisPermohonan}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Jenis Permohonan --</option>
                {jenisPermohonanOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.jenisPermohonan && (
                <div className="invalid-feedback">{errors.jenisPermohonan[0]}</div>
              )}
            </div>

            {/* Parent ID */}
            <div className="mb-3">
              <label htmlFor="parentId" className="form-label fw-semibold">
                Parent ID <span className="text-muted">(Opsional)</span>
              </label>
              <input
                type="number"
                className={`form-control ${errors.parentId ? "is-invalid" : ""}`}
                id="parentId"
                name="parentId"
                value={form.parentId}
                onChange={handleChange}
                placeholder="Isi jika ada ID induk"
              />
              {errors.parentId && (
                <div className="invalid-feedback">{errors.parentId[0]}</div>
              )}
            </div>

            {/* Keterangan */}
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label fw-semibold">
                Keterangan <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.keterangan ? "is-invalid" : ""}`}
                id="keterangan"
                name="keterangan"
                value={form.keterangan}
                onChange={handleChange}
                rows={4}
                placeholder="Deskripsikan detail permohonan..."
                required
              />
              {errors.keterangan && (
                <div className="invalid-feedback">{errors.keterangan[0]}</div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                type="submit"
                className="btn btn-success fw-bold px-4"
                disabled={updating}
              >
                {updating ? "Menyimpan..." : "Update"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/jenispermohonan")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
