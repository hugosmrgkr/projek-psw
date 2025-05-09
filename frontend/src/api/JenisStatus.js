import axios from 'axios';

const API_URL = 'http://localhost:8000/api/jenis-status';

const getAll = () => axios.get(API_URL);
const getById = (id) => axios.get(`${API_URL}/${id}`);
const create = (data) => axios.post(API_URL, data);
const update = (id, data) => axios.put(`${API_URL}/${id}`, data);
const remove = (id) => axios.delete(`${API_URL}/${id}`);

// SOLUSI: Assign ke variable dulu
const JenisStatusAPI = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default JenisStatusAPI;
