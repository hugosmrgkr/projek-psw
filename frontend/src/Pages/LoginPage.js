import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Component with embedded CSS
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
      {/* Embedded CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          :root {
            --primary: #1E88E5;
            --primary-light: #64B5F6;
            --primary-dark: #0D47A1;
            --white: #ffffff;
            --light-gray: #f5f7fa;
            --gray: #a0a0a0;
            --dark-gray: #505050;
            --shadow: rgba(0, 0, 0, 0.1);
            --success: #4CAF50;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }

          body {
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }

          body::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 300px;
            height: 300px;
            background-color: var(--primary-light);
            border-radius: 50%;
            transform: translate(50%, -50%);
            opacity: 0.3;
            z-index: -1;
          }

          body::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 400px;
            height: 400px;
            background-color: var(--primary);
            border-radius: 50%;
            transform: translate(-50%, 50%);
            opacity: 0.2;
            z-index: -1;
          }

          .login-container {
            background-color: var(--white);
            border-radius: 24px;
            box-shadow: 0 10px 30px var(--shadow);
            width: 380px;
            max-width: 90%;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            z-index: 1;
            margin: 60px auto;
          }

          .login-header {
            margin-bottom: 40px;
          }

          .login-header h2 {
            color: var(--primary-dark);
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 8px;
          }

          .login-header p {
            color: var(--gray);
            font-size: 14px;
          }

          .login-illustration {
            max-width: 180px;
            margin: 0 auto 30px;
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .login-form input {
            width: 100%;
            background-color: var(--light-gray);
            border: none;
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 16px;
            font-size: 14px;
            color: var(--dark-gray);
            outline: none;
            transition: all 0.3s ease;
          }

          .login-form input:focus {
            box-shadow: 0 0 0 2px var(--primary-light);
          }

          .login-form input::placeholder {
            color: var(--gray);
          }

          .login-form button {
            width: 100%;
            background-color: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 10px;
            padding: 15px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 8px;
          }

          .login-form button:hover {
            background-color: var(--primary-dark);
          }

          .error-message {
            color: #e53935;
            font-size: 14px;
            margin-top: 12px;
          }

          .login-footer {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 30px;
          }

          .footer-icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--gray);
            text-decoration: none;
            font-size: 12px;
          }

          .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light-gray);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 5px;
            transition: all 0.3s ease;
          }

          .footer-icon:hover .icon-circle {
            background-color: var(--primary-light);
            color: var(--white);
          }

          .isometric-decoration {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            overflow: hidden;
            opacity: 0.5;
          }

          .iso-element {
            position: absolute;
          }

          .iso-element-1 {
            width: 80px;
            height: 80px;
            background-color: var(--primary-light);
            transform: rotate(45deg);
            top: -20px;
            right: -20px;
            opacity: 0.6;
          }

          .iso-element-2 {
            width: 60px;
            height: 60px;
            background-color: var(--primary);
            transform: rotate(30deg);
            bottom: -15px;
            left: 30px;
            opacity: 0.4;
          }
          
          /* Notification styling */
          .notification-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-out;
          }
          
          .notification {
            background-color: var(--white);
            border-radius: 16px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            width: 90%;
            max-width: 360px;
            padding: 30px;
            text-align: center;
            transform: translateY(20px);
            animation: slideUp 0.5s ease-out forwards;
            position: relative;
            overflow: hidden;
          }
          
          .notification::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to right, var(--primary), var(--success));
          }
          
          .notification-icon {
            margin-bottom: 15px;
            animation: pulse 1.5s infinite;
          }
          
          .notification h3 {
            color: var(--dark-gray);
            margin-bottom: 10px;
            font-weight: 600;
            font-size: 18px;
          }
          
          .notification p {
            color: var(--gray);
            font-size: 14px;
            margin-bottom: 20px;
          }
          
          .loading-bar {
            width: 100%;
            height: 4px;
            background-color: var(--light-gray);
            border-radius: 2px;
            overflow: hidden;
            position: relative;
          }
          
          .loading-progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background: linear-gradient(to right, var(--primary), var(--success));
            animation: loadingProgress 2s linear forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes loadingProgress {
            from { width: 0%; }
            to { width: 100%; }
          }
          
          .checkmark-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e8f5e9;
            margin: 0 auto;
          }
          
          .checkmark {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 4;
            stroke-linecap: round;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          }
          
          @keyframes stroke {
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>

<div className="login-container">
  <div className="login-header">
    <h2>Login ke Akun Anda</h2>
    <p>Selamat datang kembali</p>
  </div>

  <form className="login-form" onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Login</button>
    {error && <div className="error-message">{error}</div>}
  </form>

  <div className="login-footer">
    <a href="#" className="footer-icon">
      <div className="icon-circle">F</div>
      Facebook
    </a>
    <a href="#" className="footer-icon">
      <div className="icon-circle">G</div>
      Google
    </a>
  </div>
</div>

      
      {/* Success Notification */}
      {showNotification && (
  <div className="notification-overlay">
    <div className="notification">
      <div className="notification-icon">
        <div className="checkmark-circle">
          <svg viewBox="0 0 52 52" width="30" height="30">
            <path
              className="checkmark"
              fill="none"
              stroke="#4CAF50"
              d="M14 27l7 7 17-17"
            />
          </svg>
        </div>
      </div>
      <h3>Login Berhasil!</h3>
      <p>Anda akan diarahkan ke dashboard.</p>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
    </div>
  </div>
)}</>

  );
};

export default LoginPage;