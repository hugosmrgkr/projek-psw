import axios from 'axios';

const API_URL = 'http://localhost:8000/api/lokasi-objek-retribusi';

export const getAllLokasi = async () => (await axios.get(API_URL)).data;
export const createLokasi = async (data) => (await axios.post(API_URL, data)).data;
export const getLokasiById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const updateLokasi = async (id, data) => (await axios.put(`${API_URL}/${id}`, data)).data;
export const deleteLokasi = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
