import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="mdi mdi-home"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jenis-permohonan" className="nav-link">
            <i className="mdi mdi-file-document"></i>
            <span className="menu-title">Jenis Permohonan</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
