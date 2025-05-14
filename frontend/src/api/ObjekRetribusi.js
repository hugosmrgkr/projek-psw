import axios from 'axios';

const API_URL = 'http://localhost:8000/api/objek-retribusi';

// Menangani error dari Axios dan menampilkan informasi yang lebih jelas
const handleAxiosError = (error) => {
    if (error.response) {
        // Error respons dari server (misalnya status 422)
        console.error("Response Error:", JSON.stringify(error.response.data, null, 2));
        alert(`Error: ${JSON.stringify(error.response.data, null, 2)}`);  // Menampilkan alert dengan detail error
        throw error.response.data;  // Mengembalikan pesan error dari server
    } else if (error.request) {
        // Tidak ada respons dari server
        console.error("No Response:", error.request);
        alert("Tidak ada respons dari server.");
        throw new Error("Tidak ada respons dari server.");
    } else {
        // Kesalahan saat mengatur permintaan
        console.error("Error in Setup:", error.message);
        alert(`Error: ${error.message}`);
        throw new Error(`Error: ${error.message}`);
    }
};

const headers = {
    'Content-Type': 'application/json',  // Pastikan pengiriman data dalam format JSON
};

// Mengambil semua objek retribusi
export const getAllObjekRetribusi = async () => {
    console.log("Mengambil semua objek retribusi...");
    try {
        const response = await axios.get(API_URL, { headers });
        console.log("Data Respons:", response.data);  // Menampilkan data respons di konsol
        return response.data;
    } catch (error) {
        handleAxiosError(error);  // Menangani error dengan detail
    }
};

// Membuat objek retribusi baru
export const createObjekRetribusi = async (data) => {
    console.log("Data yang dikirim:", data);  // Melihat data yang dikirim ke server
    try {
        const response = await axios.post(API_URL, data, { headers });
        console.log("Respons dari server:", response.data);  // Melihat data respons dari server
        return response.data;
    } catch (error) {
        handleAxiosError(error);  // Menangani error
    }
};

// Mengambil objek retribusi berdasarkan ID
export const getObjekRetribusiById = async (id) => {
    console.log(`Mengambil objek retribusi dengan ID: ${id}`);
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers });
        console.log("Data Respons:", response.data);  // Menampilkan data respons di konsol
        return response.data;
    } catch (error) {
        handleAxiosError(error);  // Menangani error dengan detail
    }
};

// Memperbarui objek retribusi berdasarkan ID
export const updateObjekRetribusi = async (id, data) => {
    console.log(`Memperbarui objek retribusi dengan ID: ${id}`);
    console.log("Data yang dikirim:", data);  // Melihat data yang dikirim ke server
    try {
        const response = await axios.put(`${API_URL}/${id}`, data, { headers });
        console.log("Respons dari server:", response.data);  // Melihat data respons dari server
        return response.data;
    } catch (error) {
        handleAxiosError(error);  // Menangani error dengan detail
    }
};

// Menghapus objek retribusi berdasarkan ID
export const deleteObjekRetribusi = async (id) => {
    console.log(`Menghapus objek retribusi dengan ID: ${id}`);
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers });
        console.log("Respons dari server:", response.data);  // Menampilkan respons dari server
        return response.data;
    } catch (error) {
        handleAxiosError(error);  // Menangani error dengan detail
    }
};
