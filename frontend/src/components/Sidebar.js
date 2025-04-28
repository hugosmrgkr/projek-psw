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
      </ul>
    </nav>
  );
}
export default Sidebar;
