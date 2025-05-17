import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PermohonanSewaList = () => {
  const [permohonanList, setPermohonanList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/permohonan-sewa');
      setPermohonanList(res.data.data || []);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Daftar Permohonan Sewa</h2>
        <Link to="/permohonansewa/add" className="btn btn-success">+ Tambah Permohonan</Link>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            {permohonanList.length === 0 ? (
              <div className="text-center p-4">Tidak ada data permohonan sewa.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>No</th>
                      <th>Nomor Surat</th>
                      <th>Tanggal</th>
                      <th>Nama Pemohon</th>
                      <th>Alamat</th>
                      <th>Jenis Permohonan</th>
                      <th>Tarif</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permohonanList.map((item, index) => (
                      <tr key={item.idPermohonanSewa || index}>
                        <td>{index + 1}</td>
                        <td>{item.nomorSuratPermohonan}</td>
                        <td>{item.tanggalPengajuan}</td>
                        <td>{item.namaPemohon}</td>
                        <td>{item.alamatPemohon}</td>
                        <td>{item.jenis_permohonan?.jenisPermohonan || '-'}</td>
                        <td>Rp {item.tarif_objek_retribusi?.nominalTarif?.toLocaleString('id-ID') || '0'}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <Link to={`/permohonansewa/edit/${item.idPermohonanSewa}`} className="btn btn-sm btn-warning">Edit</Link>
                            <button className="btn btn-sm btn-danger">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PermohonanSewaList;
