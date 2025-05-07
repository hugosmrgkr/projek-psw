import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/jangka-waktu-sewa';

export const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const create = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const update = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
