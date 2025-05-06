import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ListJenisPermohonan from './pages/JenisPermohonan/List';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Route for ListJenisPermohonan */}
        <Route
          path="/jenis-permohonan"
          element={
            <ProtectedRoute>
              <ListJenisPermohonan />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route for 404 */}
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
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
