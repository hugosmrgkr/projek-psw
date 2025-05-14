import axios from 'axios';

const API_URL = 'http://localhost:8000/api/objek-retribusi';

// Menangani error dari Axios dan menampilkan informasi yang lebih jelas
const handleAxiosError = (error) => {
    if (error.response) {
        console.error("Response Error:", JSON.stringify(error.response.data, null, 2));
        alert(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
        throw error.response.data;
    } else if (error.request) {
        console.error("No Response:", error.request);
        alert("Tidak ada respons dari server.");
        throw new Error("Tidak ada respons dari server.");
    } else {
        console.error("Error in Setup:", error.message);
        alert(`Error: ${error.message}`);
        throw new Error(`Error: ${error.message}`);
    }
};

// Mengambil semua objek retribusi
export const getAllObjekRetribusi = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Membuat objek retribusi baru (dengan FormData)
export const createObjekRetribusi = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Mengambil objek retribusi berdasarkan ID
export const getObjekRetribusiById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Memperbarui objek retribusi berdasarkan ID (dengan FormData)
export const updateObjekRetribusi = async (id, data) => {
    try {
        const response = await axios.post(`${API_URL}/${id}?_method=PUT`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// Menghapus objek retribusi berdasarkan ID
export const deleteObjekRetribusi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200) {
            alert(`Objek retribusi dengan ID ${id} berhasil dihapus.`);
        }
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
