import React, { useEffect, useState } from 'react';
import { getAll, remove } from '../../api/JenisJangkaWaktu';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAll();
      setData(res);
    } catch (err) {
      console.error('Gagal memuat data:', err);
      setError("Gagal memuat data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      await remove(id);
      fetchData();
    }
  };

  return (
    <div>
      <h2>Daftar Jenis Jangka Waktu</h2>
      <button onClick={() => navigate('/jenis-jangka-waktu/create')} className="btn btn-primary mb-3">
        + Tambah Baru
      </button>
      {error && <p className="text-danger">{error}</p>}

      <div className="list-group">
        {data?.map((item) => (
          <div key={item.idJenisJangkaWaktu} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.jenisJangkaWaktu}</h5>
              <div>
                <button
                  onClick={() => navigate(`/jenis-jangka-waktu/edit/${item.idJenisJangkaWaktu}`)}
                  className="btn btn-sm btn-warning mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.idJenisJangkaWaktu)}
                  className="btn btn-sm btn-danger"
                >
                  Hapus
                </button>
              </div>
            </div>
            <p className="mb-1">{item.keterangan || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
