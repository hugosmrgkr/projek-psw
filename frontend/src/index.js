import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// atau
import 'antd/dist/reset.css'; // untuk Ant Design v5

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
