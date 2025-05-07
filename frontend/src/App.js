import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

//Jenis Permohonan
import ListJenisPermohonan from './pages/JenisPermohonan/List';
import CreateJenisPermohonan from './pages/JenisPermohonan/Create';
import EditJenisPermohonan from './pages/JenisPermohonan/Edit';

//Jangka Waktu Sewa
import JangkaWaktuSewaList from './pages/JangkaWaktuSewa/List';
import JangkaWaktuSewaCreate from './pages/JangkaWaktuSewa/Create';
import JangkaWaktuSewaEdit from './pages/JangkaWaktuSewa/Edit';

//Jenis Jangka Waktu
import ListJenisJangkaWaktu from './pages/JenisJangkaWaktu/List';
import CreateJenisJangkaWaktu from './pages/JenisJangkaWaktu/Create';
import EditJenisJangkaWaktu from './pages/JenisJangkaWaktu/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* Jenis Permohonan */}
          <Route path="jenis-permohonan" element={<ListJenisPermohonan />} />
          <Route path="jenis-permohonan/create" element={<CreateJenisPermohonan />} />
          <Route path="jenis-permohonan/edit/:id" element={<EditJenisPermohonan />} />

          {/* Jangka Waktu Sewa */}
          <Route path="jangka-waktu-sewa" element={<JangkaWaktuSewaList />} />
          <Route path="jangka-waktu-sewa/create" element={<JangkaWaktuSewaCreate />} />
          <Route path="jangka-waktu-sewa/edit/:id" element={<JangkaWaktuSewaEdit />} />

          <Route path="jenis-jangka-waktu" element={<ListJenisJangkaWaktu />} />
          <Route path="jenis-jangka-waktu/create" element={<CreateJenisJangkaWaktu />} />
          <Route path="jenis-jangka-waktu/edit/:id" element={<EditJenisJangkaWaktu />} />
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
            <React.Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
