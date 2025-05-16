import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const JenisObjekRetribusiDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/jenis-objek-retribusi/${id}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="content-card">
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="content-card">
        <div className="page-header">
          <h2 className="page-title">Detail Jenis Objek Retribusi</h2>
          <div className="actions-bar">
            <Link to="/jenisobjekretribusi" className="btn btn-primary">
              Kembali ke Daftar
            </Link>
          </div>
        </div>
        <div className="detail-card">
          <div className="detail-item">
            <strong>Jenis Objek:</strong>
            <p>{data.jenisObjekRetribusi}</p>
          </div>
          <div className="detail-item">
            <strong>Keterangan:</strong>
            <p>{data.keterangan || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JenisObjekRetribusiDetail;
