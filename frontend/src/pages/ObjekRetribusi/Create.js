import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createObjekRetribusi } from '../../api/ObjekRetribusi';

const Create = () => {
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
    gambarDenahTanah: null, // Untuk gambar
  });

  const navigate = useNavigate();

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
    try {
      await createObjekRetribusi(formData);
      navigate('/objek-retribusi');
    } catch (error) {
      alert("Gagal membuat objek retribusi");
    }
  };

  return (
    <div>
      <h2>Create Objek Retribusi</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
