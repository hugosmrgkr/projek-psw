import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  Users,
  FileText,
  Building,
  Tag,
  Store,
  User,
  Home,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

function Sidebar({ collapsed, toggleSidebar }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const isActiveRoute = (route) => location.pathname === route;

  const menuItems = [
    {
      id: 'pengguna',
      title: 'Pengguna',
      icon: <Users size={18} />,
      submenu: [{ title: 'Data User', path: '/user' }],
    },
    {
      id: 'permohonan',
      title: 'Permohonan',
      icon: <FileText size={18} />,
      submenu: [
        { title: 'Jenis Permohonan', path: '/jenispermohonan' },
        { title: 'Permohonan Sewa', path: '/permohonansewa' },
      ],
    },
    {
      id: 'jangkaWaktu',
      title: 'Jangka Waktu',
      icon: <Clock size={18} />,
      submenu: [
        { title: 'Jenis Jangka Waktu', path: '/jenisjangkawaktu' },
        { title: 'Jangka Waktu Sewa', path: '/jangkawaktusewa' },
      ],
    },
    {
      id: 'objekRetribusi',
      title: 'Objek Retribusi',
      icon: <Building size={18} />,
      submenu: [
        { title: 'Data Objek Retribusi', path: '/dataobjekretribusi' },
        { title: 'Jenis Objek Retribusi', path: '/jenisobjekretribusi' },
        { title: 'Lokasi Objek Retribusi', path: '/lokasiobjekretribusi' },
        { title: 'Tarif Objek Retribusi', path: '/tarifobjekretribusi' },
      ],
    },
    {
      id: 'status',
      title: 'Status',
      icon: <Tag size={18} />,
      submenu: [
        { title: 'Data Status', path: '/datastatus' },
        { title: 'Jenis Status', path: '/jenisstatus' },
      ],
    },
    {
      id: 'peruntukan',
      title: 'Peruntukan',
      icon: <Store size={18} />,
      submenu: [{ title: 'Peruntukan Sewa', path: '/peruntukansewa' }],
    },
    {
      id: 'wajibRetribusi',
      title: 'Wajib Retribusi',
      icon: <User size={18} />,
      submenu: [{ title: 'Data Wajib Retribusi', path: '/wajibretribusi' }],
    },
  ];

  return (
    <aside
      className="d-flex flex-column bg-dark text-white border-end shadow-sm"
      style={{
        width: collapsed ? 70 : 250,
        transition: 'width 0.3s ease',
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        position: 'fixed',
        top: '70px',
        left: 0,
        zIndex: 1040,
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        {!collapsed && (
          <div className="small text-uppercase fw-semibold text-white-50">
            Panel Admin
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-sm btn-outline-light"
          style={{ width: 32, height: 32, padding: 0 }}
          title={collapsed ? 'Perbesar' : 'Perkecil'}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      <nav className="flex-grow-1 overflow-auto mt-2">
        <Link
          to="/dashboard"
          className={`d-flex align-items-center gap-3 px-3 py-2 text-decoration-none ${
            isActiveRoute('/dashboard') ? 'bg-primary text-white' : 'text-white-50'
          }`}
        >
          <div
            className="bg-secondary bg-opacity-25 rounded d-flex align-items-center justify-content-center"
            style={{ width: 32, height: 32 }}
          >
            <Home size={18} />
          </div>
          {!collapsed && <span className="fw-medium">Dashboard</span>}
        </Link>

        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className="d-flex justify-content-between align-items-center w-100 px-3 py-2 btn text-start text-white border-0"
              onClick={() => toggleMenu(item.id)}
              type="button"
              aria-expanded={expandedMenu === item.id}
              aria-controls={`${item.id}-submenu`}
            >
              <span className="d-flex align-items-center gap-3">
                <div
                  className="bg-secondary bg-opacity-25 rounded d-flex align-items-center justify-content-center"
                  style={{ width: 32, height: 32 }}
                >
                  {item.icon}
                </div>
                {!collapsed && <span className="fw-medium">{item.title}</span>}
              </span>
              {!collapsed && (
                <ChevronRight
                  size={16}
                  className={`ms-auto transition-transform ${
                    expandedMenu === item.id ? 'rotate-90' : ''
                  }`}
                  style={{
                    transform: expandedMenu === item.id ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              )}
            </button>

            {!collapsed && (
              <div
                id={`${item.id}-submenu`}
                className={`${expandedMenu === item.id ? 'd-block' : 'd-none'}`}
              >
                {item.submenu.map((sub, idx) => (
                  <Link
                    key={idx}
                    to={sub.path}
                    className={`d-block px-5 py-2 text-decoration-none ${
                      isActiveRoute(sub.path)
                        ? 'text-white bg-primary rounded'
                        : 'text-white-50'
                    }`}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
