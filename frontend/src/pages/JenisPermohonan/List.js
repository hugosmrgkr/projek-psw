import { useEffect, useState } from 'react';
import axios from 'axios';

function ListJenisPermohonan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/jenis-permohonan')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Daftar Jenis Permohonan</h2>
      <ul>
        {data.map(item => (
          <li key={item.idJenisPermohonan}>{item.jenisPermohonan}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListJenisPermohonan;
