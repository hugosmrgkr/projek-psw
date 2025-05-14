import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllObjekRetribusi, deleteObjekRetribusi } from '../../api/ObjekRetribusi';

const List = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await getAllObjekRetribusi();
    setData(result);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteObjekRetribusi(id);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>List Objek Retribusi</h2>
      <Link to="/objek-retribusi/create">+ Create</Link>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.alamat} - {item.keterangan}
            <Link to={`/objek-retribusi/edit/${item.id}`}>Edit</Link>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
