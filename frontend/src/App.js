import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('Memuat pesan...');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/greeting')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('Gagal fetch:', err);
        setMessage('Gagal mengambil data dari Laravel API.');
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>Pesan dari Laravel API:</strong>
        </p>
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
