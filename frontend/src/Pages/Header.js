import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      style={{
        width: '100%',
        height: 81,
        padding: '16px',
        background: 'white',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 1050,
      }}
    >
      {/* Kiri: Logo dan Nama */}
      <div className="d-flex align-items-center ps-3">
        <img src="/tapatupa-logo.png" alt="Logo" style={{ width: 97, height: 61 }} />
      </div>

      
        <button
          className="btn btn-outline-danger ms-3 d-flex align-items-center gap-2"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
  );
}

export default Header;
