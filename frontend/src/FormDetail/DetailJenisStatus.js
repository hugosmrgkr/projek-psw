import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ShowJenisStatus = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jenis-status/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h2 style={{ color: "#3f51b5", marginBottom: "20px" }}>Detail Jenis Status</h2>

        {data ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px", width: "40%" }}>ID Jenis Status</td>
                <td style={{ padding: "8px" }}>{data.idJenisStatus}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px" }}>Jenis Status</td>
                <td style={{ padding: "8px" }}>{data.jenisStatus}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", padding: "8px" }}>Keterangan</td>
                <td style={{ padding: "8px" }}>{data.keterangan}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Memuat data...</p>
        )}

        <div style={{ marginTop: "20px" }}>
          <Link to="/status" style={{
            padding: "10px 16px",
            backgroundColor: "#3f51b5",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold"
          }}>
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowJenisStatus;
