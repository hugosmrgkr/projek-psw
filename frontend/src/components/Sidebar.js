// src/components/Sidebar.jsx
import React from 'react';

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="icon-grid menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-image menu-icon" />
            <span className="menu-title">Galeri</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-info-circle menu-icon" />
            <span className="menu-title">About Monokkrom</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-newspaper menu-icon" />
            <span className="menu-title">Berita Harian</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-cogs menu-icon" />
            <span className="menu-title">Layanan</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-question-circle menu-icon" />
            <span className="menu-title">FAQ</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fa fa-comments menu-icon" />
            <span className="menu-title">Ulasan</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
