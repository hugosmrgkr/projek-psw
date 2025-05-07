import axios from 'axios';
import { useEffect, useState } from 'react';

function JenisPermohonList() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null); // Untuk menyimpan pesan error
    const [loading, setLoading] = useState(true); // Untuk status loading

    useEffect(() => {
        // Request ke API backend Laravel
        axios.get('http://localhost:8000/api/jenis-permohonan')
            .then(res => {
                // Simpan data yang diterima
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                // Tangani error
                if (err.response) {
                    // Jika errornya ada response dari server
                    setError(`Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
                } else if (err.request) {
                    // Jika request tidak mendapat response
                    setError('Error: No response from server');
                } else {
                    // Jika ada error lain
                    setError(`Error: ${err.message}`);
                }
                setLoading(false);
            });
    }, []); // Hanya jalankan sekali setelah komponen di-mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Jenis Permohonan</h2>
            <ul>
                {/* Mapping data ke list */}
                {data.map(item => (
                    <li key={item.idJenisPermohonan}>
                        {item.nama_jenis_permohonan}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JenisPermohonList;
