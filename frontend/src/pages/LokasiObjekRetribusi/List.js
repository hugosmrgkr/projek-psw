import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllLokasi, deleteLokasi } from '../../api/LokasiObjekRetribusi';

function ListLokasi() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setList(await getAllLokasi());
    } catch {
      setError('Gagal mengambil data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus data ini?')) return;
    setDeletingId(id);
    try {
      await deleteLokasi(id);
      fetchData();
    } catch {
      setError('Gagal menghapus.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <h2>List Lokasi</h2>
      <Link to="/lokasi-objek-retribusi/create">
        <button>Tambah</button>
      </Link>
      {loading ? <p>Memuat...</p> : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>No</th>
              <th>Lokasi</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length ? list.map((item, i) => (
              <tr key={item.idLokasiObjekRetribusi}>
                <td>{i + 1}</td>
                <td>{item.lokasiObjekRetribusi}</td>
                <td>{item.keterangan}</td>
                <td>
                  <Link to={`/lokasi-objek-retribusi/edit/${item.idLokasiObjekRetribusi}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(item.idLokasiObjekRetribusi)} disabled={deletingId === item.idLokasiObjekRetribusi}>
                    {deletingId === item.idLokasiObjekRetribusi ? 'Menghapus...' : 'Hapus'}
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4" align="center">Data kosong</td></tr>
            )}
          </tbody>
        </table>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  );
}

export default ListLokasi;
