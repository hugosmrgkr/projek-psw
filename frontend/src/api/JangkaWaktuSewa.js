import axios from '../utils/axios';

const API = '/jangka-waktu-sewa';

export const getAll = () => axios.get(API);
export const getById = id => axios.get(`${API}/${id}`);
export const create = data => axios.post(API, data);
export const update = (id, data) => axios.put(`${API}/${id}`, data);
export const remove = id => axios.delete(`${API}/${id}`);
