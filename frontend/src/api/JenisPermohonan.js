import axios from 'axios';
import { useEffect, useState } from 'react';

function JenisPermohonList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jenis-permohonan')
            .then(res => setData(res.data))
            .catch(err => console.error(err)); // Menambahkan penanganan error
    }, []);

    return (
        <div>
            <h2>Jenis Permohonan</h2>
            <ul>
                {data.map(item => (
                    <li key={item.idJenisPermohonan}>{item.jenisPermohonan}</li>
                ))}
            </ul>
        </div>
    );
}

export default JenisPermohonList; // Ekspor komponen agar dapat digunakan
