import React, { useEffect, useState } from 'react';
import { getAll, remove } from '../../api/JangkaWaktuSewa';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAll();
    setData(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus data ini?")) {
      await remove(id);
      fetchData();
    }
  };

  return (
    <div>
      <h2>Daftar Jangka Waktu Sewa</h2>
      <button onClick={() => navigate('/jangka-waktu-sewa/create')} className="btn btn-primary mb-3">+ Tambah Baru</button>
      <div className="list-group">
        {data.map((d) => (
          <div key={d.idJangkaWaktuSewa} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{d.jangkaWaktu}</h5>
              <div>
                <button onClick={() => navigate(`/jangka-waktu-sewa/edit/${d.idJangkaWaktuSewa}`)} className="btn btn-sm btn-warning mr-2">Edit</button>
                <button onClick={() => handleDelete(d.idJangkaWaktuSewa)} className="btn btn-sm btn-danger">Hapus</button>
              </div>
            </div>
            {/* Keterangan tampil di bawah nama jangka waktu */}
            <p className="mb-1">{d.keterangan ? d.keterangan : '-'}</p>
            <p className="mb-1">{d.isDefault ? '✔ Default' : '✘ Bukan Default'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
