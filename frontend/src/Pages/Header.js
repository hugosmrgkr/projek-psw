import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top px-3" style={{ zIndex: 1050 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left: Logo dan Teks */}
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle bg-warning d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
            <img
              src="/background.png"
              alt="Logo"
              className="rounded-circle"
              style={{ width: 34, height: 34, objectFit: 'cover' }}
            />
          </div>
          <span className="fw-bold fs-4 mb-0 user-select-none">TapaTupa</span>
        </div>

        {/* Right: Dropdown Profile */}
        <div className="dropdown">
          <button
            className="btn btn-light d-flex align-items-center gap-2"
            onClick={toggleDropdown}
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            <img
              src="/assets-admin/images/faces/face28.jpg"
              alt="Profile"
              className="rounded-circle"
              style={{ width: 40, height: 40, objectFit: 'cover' }}
            />
            <i className="bi bi-chevron-down"></i>
          </button>

          <ul className={`dropdown-menu dropdown-menu-end mt-2${showDropdown ? ' show' : ''}`}>
            <li>
              <button className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
