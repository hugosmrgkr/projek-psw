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
        <li className="nav-item">
          <Link to="/jangka-waktu-sewa" className="nav-link">
            <i className="mdi mdi-calendar-clock"></i>
            <span className="menu-title">Jangka Waktu Sewa</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jenis-jangka-waktu" className="nav-link">
            <i className="mdi mdi-timetable"></i>
            <span className="menu-title">Jenis Jangka Waktu</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jenis-objek-retribusi" className="nav-link">
            <i className="mdi mdi-map-marker-radius"></i>
            <span className="menu-title">Jenis Objek Retribusi</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jenis-status" className="nav-link">
            <i className="mdi mdi-format-list-bulleted"></i>
            <span className="menu-title">Jenis Status</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
