import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8000/api/jenis-permohonan";

const DetailJenisPermohonan = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        alert("Gagal mengambil data. Pastikan ID valid.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Memuat detail data...</div>;
  if (!data) return <div className="text-center mt-5">Data tidak ditemukan.</div>;

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Detail Jenis Permohonan</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>ID:</strong>
            <div>{data.id}</div>
          </div>

          <div className="mb-3">
            <strong>Jenis Permohonan:</strong>
            <div>{data.jenisPermohonan}</div>
          </div>

          <div className="mb-3">
            <strong>Parent ID:</strong>
            <div>{data.parentId ?? '-'}</div>
          </div>

          <div className="mb-3">
            <strong>Keterangan:</strong>
            <div>{data.keterangan}</div>
          </div>

          <div className="mb-3">
            <strong>Dibuat pada:</strong>
            <div>{new Date(data.created_at).toLocaleString()}</div>
          </div>

          <div className="mb-3">
            <strong>Terakhir diupdate:</strong>
            <div>{new Date(data.updated_at).toLocaleString()}</div>
          </div>

          <Link to="/" className="btn btn-secondary mt-3">
            ← Kembali ke Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailJenisPermohonan;
