import React from 'react';
import { Outlet } from 'react-router-dom'; // Menambahkan Outlet
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="container-scroller">
      {/* Sidebar */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/jenis-permohonan">
              <span className="menu-title">Jenis Permohonan</span>
              <i className="mdi mdi-file-document menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Panel */}
      <div className="container-fluid page-body-wrapper">
        {/* Navbar */}
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex justify-content-center">
            <a className="navbar-brand brand-logo" href="/">MyAdmin</a>
            <a className="navbar-brand brand-logo-mini" href="/">MA</a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                  <span className="nav-profile-name">Admin</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                  <Link className="dropdown-item" to="/">
                    <i className="mdi mdi-logout text-primary"></i>
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="main-panel">
          <div className="content-wrapper">
            {/* Render nested routes */}
            <Outlet /> {/* Ini adalah tempat dimana rute anak akan dirender */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
