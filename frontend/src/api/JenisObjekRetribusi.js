import axios from 'axios';

const API_URL = '/api/jenis-objek-retribusi';

export const getAllJenisObjekRetribusi = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createJenisObjekRetribusi = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getJenisObjekRetribusiById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateJenisObjekRetribusi = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteJenisObjekRetribusi = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
