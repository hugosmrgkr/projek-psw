import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:8000/api/objek-retribusi";

const ObjekRetribusiDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/${id}`)
      .then((res) => {
        setDetail(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-4">Memuat detail...</p>;
  if (!detail) return <p className="text-center mt-4">Data tidak ditemukan.</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Detail Objek Retribusi</h3>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-sm-4 fw-semibold">ID:</div>
            <div className="col-sm-8">{detail.id}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4 fw-semibold">Kode:</div>
            <div className="col-sm-8">{detail.kodeObjekRetribusi}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4 fw-semibold">Nama:</div>
            <div className="col-sm-8">{detail.objekRetribusi}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4 fw-semibold">No Bangunan:</div>
            <div className="col-sm-8">{detail.noBangunan}</div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4 fw-semibold">Alamat:</div>
            <div className="col-sm-8">{detail.alamat}</div>
          </div>
          {/* Kamu bisa tambah detail lain seperti latitude, longitude, keterangan, dll di sini */}
          <div className="mt-4">
            <Link to="/objekretribusi" className="btn btn-secondary">
              ← Kembali ke Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjekRetribusiDetail;
