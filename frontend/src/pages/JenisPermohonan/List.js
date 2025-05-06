import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListJenisPermohonan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/jenis-permohonan')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteData = (id) => {
    if (window.confirm('Yakin ingin menghapus?')) {
      axios.delete(`http://localhost:8000/api/jenis-permohonan/${id}`)
        .then(() => setData(data.filter(item => item.idJenisPermohonan !== id)));
    }
  };

  return (
    <>
      <h2>Jenis Permohonan</h2>
      <Link to="/jenis-permohonan/create" className="btn btn-primary mb-3">Tambah Data</Link>
      <div className="list-group">
        {data.map(item => (
          <div key={item.idJenisPermohonan} className="list-group-item">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.jenisPermohonan}</h5>
              <div>
                <Link to={`/jenis-permohonan/edit/${item.idJenisPermohonan}`} className="btn btn-sm btn-warning mr-2">Edit</Link>
                <button onClick={() => deleteData(item.idJenisPermohonan)} className="btn btn-sm btn-danger">Hapus</button>
              </div>
            </div>
            {/* Keterangan tampil di bawah nama permohonan */}
            <p className="mb-1">{item.keterangan ? item.keterangan : '-'}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListJenisPermohonan;
