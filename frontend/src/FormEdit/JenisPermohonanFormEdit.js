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
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white fw-bold">
          Edit Jenis Permohonan
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="jenisPermohonan" className="form-label">
                Jenis Permohonan
              </label>
              <select
                name="jenisPermohonan"
                id="jenisPermohonan"
                className={`form-select ${errors.jenisPermohonan ? "is-invalid" : ""}`}
                value={form.jenisPermohonan}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Jenis Permohonan</option>
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

            <div className="mb-3">
              <label htmlFor="parentId" className="form-label">
                Parent ID (optional)
              </label>
              <input
                type="number"
                className={`form-control ${errors.parentId ? "is-invalid" : ""}`}
                id="parentId"
                name="parentId"
                value={form.parentId}
                onChange={handleChange}
              />
              {errors.parentId && (
                <div className="invalid-feedback">{errors.parentId[0]}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <textarea
                className={`form-control ${errors.keterangan ? "is-invalid" : ""}`}
                id="keterangan"
                name="keterangan"
                value={form.keterangan}
                onChange={handleChange}
                rows={4}
                required
              />
              {errors.keterangan && (
                <div className="invalid-feedback">{errors.keterangan[0]}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success fw-bold">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
