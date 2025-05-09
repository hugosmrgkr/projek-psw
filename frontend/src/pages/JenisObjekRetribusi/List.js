import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListJenisObjekRetribusi() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // id yang sedang dihapus

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/jenis-objek-retribusi');
      setList(res.data);
    } catch (err) {
      console.error('Error fetching data:', err.response?.data || err.message);
      setError("Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm('Yakin ingin menghapus data ini?');
    if (!confirmed) return;

    setDeletingId(id);

    try {
      await axios.delete(`http://localhost:8000/api/jenis-objek-retribusi/${id}`);
      await fetchData();
    } catch (err) {
      console.error('Error deleting data:', err.response?.data || err.message);
      setError("Gagal menghapus data.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>List Jenis Objek Retribusi</h2>
        <Link to="/jenis-objek-retribusi/create">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Tambah
          </button>
        </Link>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>No</th>
              <th>Jenis Objek Retribusi</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item, index) => (
                <tr key={item.idJenisObjekRetribusi}>
                  <td>{index + 1}</td>
                  <td>{item.jenisObjekRetribusi}</td>
                  <td>{item.keterangan}</td>
                  <td>
                    <Link to={`/jenis-objek-retribusi/edit/${item.idJenisObjekRetribusi}`}>
                      <button className="px-2 py-1 bg-yellow-400 text-black rounded mr-2 hover:bg-yellow-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.idJenisObjekRetribusi)}
                      disabled={deletingId === item.idJenisObjekRetribusi}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      {deletingId === item.idJenisObjekRetribusi ? 'Menghapus...' : 'Hapus'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" align="center">Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ListJenisObjekRetribusi;
