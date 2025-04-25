import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
