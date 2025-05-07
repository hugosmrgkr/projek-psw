// 📁 src/api/JenisJangkaWaktu.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/jenis-jangka-waktu';

export const getAll = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Gagal mengambil data:', err);
    throw err;
  }
};

export const getById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Gagal mengambil data berdasarkan ID:', err);
    throw err;
  }
};

export const create = async (data) => {
  try {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  } catch (err) {
    console.error('Gagal menambahkan data:', err);
    throw err;
  }
};

export const update = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('Gagal memperbarui data:', err);
    throw err;
  }
};

export const remove = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Gagal menghapus data:', err);
    throw err;
  }
};
