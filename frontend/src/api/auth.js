// src/api/auth.js
const BASE_URL = 'http://localhost:8000/api'; // ganti kalau beda port/backend

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login gagal');
  }

  return response.json(); // token & user info
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  localStorage.removeItem('token');
};
