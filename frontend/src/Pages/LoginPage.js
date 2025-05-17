import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the external CSS file

// Component with external CSS
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      
      // Tampilkan notifikasi sebelum navigasi
      setShowNotification(true);
      
      // Setelah 2 detik, navigasi ke dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Email atau password salah');
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Background decoration elements */}
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>
        <div className="bg-element bg-element-3"></div>

        {/* Main login container */}
        <div className="login-box">
          {/* Logo placeholder */}
          <div className="login-logo">
            <img src="tapatupa.png" alt="Logo" />
          </div>

          {/* Login form */}
          <div className="login-form-container">
            <form onSubmit={handleLogin} className="login-form">
              {/* Username/Email input */}
              <div className="form-group">
                <div className="form-label">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              {/* Password input */}
              <div className="form-group">
                <div className="form-label">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              {/* Login button */}
              <div className="form-button-container">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>

              {/* Error message */}
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      
      {/* Success Notification */}
      {showNotification && (
        <div className="notification-overlay">
          <div className="notification-container">
            <div className="notification-content">
              <div className="notification-icon">
                <svg viewBox="0 0 52 52" width="30" height="30">
                  <path
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="3"
                    d="M14 27l7 7 17-17"
                  />
                </svg>
              </div>
              <h3 className="notification-title">Login Berhasil!</h3>
              <p className="notification-message">Anda akan diarahkan ke dashboard.</p>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;