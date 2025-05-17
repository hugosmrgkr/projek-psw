import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TarifObjekRetribusiList = () => {
  const [tarifList, setTarifList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/tarif-objek-retribusi');
      setTarifList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat data tarif objek retribusi');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hapus data
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/tarif-objek-retribusi/${id}`);
        alert('Data berhasil dihapus');
        fetchData(); // refresh data
      } catch (err) {
        alert('Gagal menghapus data');
      }
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Daftar Tarif Objek Retribusi</h3>

      <div className="mb-3">
        <Link to="/tarifobjekretribusi/add" className="btn btn-primary">
          + Tambah Tarif
        </Link>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark text-center align-middle">
          <tr>
            <th>ID</th>
            <th>Objek Retribusi</th>
            <th>Jenis Jangka Waktu</th>
            <th>Tanggal Dinilai</th>
            <th>Nama Penilai</th>
            <th>Nominal Tarif (Rp)</th>
            <th style={{ minWidth: '140px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tarifList.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Data tidak tersedia</td>
            </tr>
          ) : (
            tarifList.map((tarif) => (
              <tr key={tarif.idTarifObjekRetribusi}>
                <td className="text-center">{tarif.idTarifObjekRetribusi}</td>
                <td>{tarif.objek_retribusi?.namaObjekRetribusi || '-'}</td>
                <td>{tarif.jenis_jangka_waktu?.namaJenisJangkaWaktu || '-'}</td>
                <td className="text-center">{tarif.tanggalDinilai}</td>
                <td>{tarif.namaPenilai}</td>
                <td className="text-end">{Number(tarif.nominalTarif).toLocaleString('id-ID')}</td>
                <td className="text-center">
                  <Link 
                    to={`/tarifobjekretribusi/edit/${tarif.idTarifObjekRetribusi}`} 
                    className="btn btn-sm btn-warning me-2"
                    title="Edit"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(tarif.idTarifObjekRetribusi)} 
                    className="btn btn-sm btn-danger"
                    title="Hapus"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TarifObjekRetribusiList;
