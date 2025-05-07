import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Pastikan token disimpan dengan kunci 'token'

    if (!token) {
        return <Navigate to="/" replace />;  // Redirect ke halaman login jika tidak ada token
    }

    return children;  // Jika ada token, tampilkan halaman yang diminta
};

export default ProtectedRoute;
