import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllObjekRetribusi, deleteObjekRetribusi } from '../../api/ObjekRetribusi';

const List = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getAllObjekRetribusi();
      console.log("Hasil data dari API:", result); // Debug jika ingin lihat ID-nya
      setData(result);
    } catch (error) {
      alert("Gagal memuat data objek retribusi");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await deleteObjekRetribusi(id);
        if (response.success || response.message === 'Data berhasil dihapus') {
          alert("Data berhasil dihapus!");
          fetchData();
        } else {
          alert(response.error || "Gagal menghapus objek retribusi");
        }
      } catch (error) {
        alert("Gagal menghapus objek retribusi");
        console.error("Error deleting objek retribusi:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>List Objek Retribusi</h2>
      {/* Tombol untuk navigasi ke halaman Create */}
      <Link to="/objek-retribusi/create">
        <button>+ Create</button>
      </Link>
      <ul>
        {data.map((item, index) => (
          <li key={item.id_objek_retribusi || index}>
            {item.alamat} - {item.keterangan}
            {/* Link untuk menuju halaman edit objek */}
            <Link to={`/objek-retribusi/edit/${item.id_objek_retribusi}`}>Edit</Link>
            {/* Tombol untuk menghapus objek */}
            <button onClick={() => handleDelete(item.id_objek_retribusi)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
