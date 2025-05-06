import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'; // Impor Outlet
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ListJenisPermohonan from './pages/JenisPermohonan/List';
import CreateJenisPermohonan from './pages/JenisPermohonan/Create';
import EditJenisPermohonan from './pages/JenisPermohonan/Edit';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route login */}
        <Route path="/" element={<Login />} />

        {/* Protected route untuk halaman dashboard dan halaman lainnya */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jenis-permohonan" element={<ListJenisPermohonan />} />
          <Route path="jenis-permohonan/create" element={<CreateJenisPermohonan />} />
          <Route path="jenis-permohonan/edit/:id" element={<EditJenisPermohonan />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            {/* Render halaman anak menggunakan outlet */}
            <React.Suspense fallback={<div>Loading...</div>}>
              <Outlet /> {/* Ini akan merender halaman yang sesuai dengan rute anak */}
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
