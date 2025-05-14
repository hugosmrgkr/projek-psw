import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getObjekRetribusiById, updateObjekRetribusi } from '../../api/ObjekRetribusi';

const Edit = () => {
  const [formData, setFormData] = useState({
    alamat: '',
    keterangan: '',
    jumlahLantai: '',
    panjangTanah: '',
    lebarTanah: '',
    luasTanah: '',
    panjangBangunan: '',
    lebarBangunan: '',
    luasBangunan: '',
    gambarDenahTanah: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getObjekRetribusiById(id);
      setFormData(data);
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await updateObjekRetribusi(id, formDataToSend); // Kirim FormData ke API
      navigate('/objek-retribusi');
    } catch (error) {
      alert("Gagal memperbarui objek retribusi");
    }
  };

  return (
    <div>
      <h2>Edit Objek Retribusi</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          placeholder="Alamat"
          required
        />
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          placeholder="Keterangan"
        />
        <input
          type="number"
          name="jumlahLantai"
          value={formData.jumlahLantai}
          onChange={handleChange}
          placeholder="Jumlah Lantai"
          required
        />
        <input
          type="number"
          name="panjangTanah"
          value={formData.panjangTanah}
          onChange={handleChange}
          placeholder="Panjang Tanah"
          required
        />
        <input
          type="number"
          name="lebarTanah"
          value={formData.lebarTanah}
          onChange={handleChange}
          placeholder="Lebar Tanah"
          required
        />
        <input
          type="number"
          name="luasTanah"
          value={formData.luasTanah}
          onChange={handleChange}
          placeholder="Luas Tanah"
          required
        />
        <input
          type="number"
          name="panjangBangunan"
          value={formData.panjangBangunan}
          onChange={handleChange}
          placeholder="Panjang Bangunan"
          required
        />
        <input
          type="number"
          name="lebarBangunan"
          value={formData.lebarBangunan}
          onChange={handleChange}
          placeholder="Lebar Bangunan"
          required
        />
        <input
          type="number"
          name="luasBangunan"
          value={formData.luasBangunan}
          onChange={handleChange}
          placeholder="Luas Bangunan"
          required
        />
        <input
          type="file"
          name="gambarDenahTanah"
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
