import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from "./Pages/Sidebar";
import Header from "./Pages/Header";
import UserList from "./List/UserList";
import UserFormAdd from "./FormAdd/UserFormAdd";
import UserFormEdit from "./FormEdit/UserFormEdit";
import JenisPermohonanList from "./List/JenisPermohonanList";
import JenisPermohonanAdd from "./FormAdd/JenisPermohonanFormAdd";
import JenisPermohonanEdit from "./FormEdit/JenisPermohonanFormEdit";
import JenisJangkaWaktuList from "./List/JenisJangkaWaktuList";
import JenisJangkaWaktuFormAdd from "./FormAdd/JenisJangkaWaktuFormAdd";
import JenisJangkaWaktuFormEdit from "./FormEdit/JenisJangkaWaktuFormEdit";
import JangkaWaktuSewaList from './List/JangkaWaktuSewaList';
import JangkaWaktuSewaFormAdd from './FormAdd/JangkaWaktuSewaFormAdd';
import JangkaWaktuSewaFormEdit from './FormEdit/JangkaWaktuSewaFormEdit';
import LokasiObjekRetribusiList from './List/LokasiObjekRetribusiList';
import LokasiObjekRetribusiFormAdd from './FormAdd/LokasiObjekRetribusiFormAdd';
import LokasiObjekRetribusiFormEdit from './FormEdit/LokasiObjekRetribusiFormEdit';
import JenisObjekRetribusiList from "./List/JenisObjekRetribusiList";
import JenisObjekRetribusiFormAdd from "./FormAdd/JenisObjekRetribusiFormAdd";
import JenisObjekRetribusiFormEdit from "./FormEdit/JenisObjekRetribusiFormEdit";
import ObjekRetribusiFormAdd from './FormAdd/ObjekRetribusiFormAdd';
import ObjekRetribusiFormEdit from './FormEdit/ObjekRetribusiFormEdit';
import ObjekRetribusiList from './List/ObjekRetribusiList';
import JenisStatusFormAdd from "./FormAdd/JenisStatusFormAdd";
import JenisStatusFormEdit from "./FormEdit/JenisStatusFormEdit";
import JenisStatusList from "./List/JenisStatusList";
import StatusList from './List/StatusList';
import StatusFormAdd from './FormAdd/StatusFormAdd';
import StatusFormEdit from './FormEdit/StatusFormEdit';
import PeruntukanSewaList from './List/PeruntukanSewaList';
import PeruntukanSewaFormAdd from './FormAdd/PeruntukanSewaFormAdd';
import PeruntukanSewaFormEdit from './FormEdit/PeruntukanSewaFormEdit';
import WajibRetribusiList from './List/WajibRetribusiList';
import WajibRetribusiAdd from './FormAdd/WajibRetribusiFormAdd';
import WajibRetribusiEdit from './FormEdit/WajibRetribusiFormEdit';
import TarifObjekRetribusiList from './List/TarifObjekRetribusiList';
import TarifObjekRetribusiFormAdd from './FormAdd/TarifObjekRetribusiFormAdd';
import TarifObjekRetribusiFormEdit from './FormEdit/TarifObjekRetribusiFormEdit';
import PermohonanSewaList from './List/PermohonanSewaList';
import PermohonanSewaFormAdd from './FormAdd/PermohonanSewaFormAdd';
import PermohonanSewaFormEdit from './FormEdit/PermohonanSewaFormEdit';
import LoginPage from './Pages/LoginPage';
import JenisPermohonanFormDetail from "./FormDetail/JenisPermohonanFormDetail";
import DetailPermohonanSewa from './FormDetail/DetailPermohonanSewa';
import DetailJenisJangkaWaktu from './FormDetail/DetailJenisJangkaWaktu';
import DashboardList from './List/Dashboard';
import DetailJangkaWaktuSewa from './FormDetail/DetailJangkaWaktuSewa';
import JenisObjekRetribusiFormDetail from './FormDetail/DetailJenisObjekRetribusi';
import LokasiObjekRetribusiDetail from "./FormDetail/DetailLokasiObjekRetribusi";
import ObjekRetribusiDetail from "./FormDetail/DetailObjekRetribusi";
import TarifObjekRetribusiDetail from "./FormDetail/DetailTarifObjekRetribusi";
import ShowJenisStatus from "./FormDetail/DetailJenisStatus";
import PeruntukanSewaDetail from "./FormDetail/PeruntukanSewaDetail";
import StatusDetail from "./FormDetail/StatusDetail";
import WajibRetribusiDetail from './FormDetail/WajibRetribusiDetail';
import UserDetail from './FormDetail/UserDetail';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div>
      <Header />

      <div
        className="d-flex"
        style={{ marginTop: '70px', minHeight: '100vh' }}
      >
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

        <main
          style={{
            marginLeft: collapsed ? 70 : 250,
            padding: '1rem',
            flexGrow: 1,
            transition: 'margin-left 0.3s ease',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<DashboardList />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/tambah" element={<UserFormAdd />} />
        <Route path="/user/edit/:id" element={<UserFormEdit />} />
        <Route path="/jenispermohonan" element={<JenisPermohonanList />} />
        <Route path="/jenispermohonan/tambah" element={<JenisPermohonanAdd />} />
        <Route path="/jenispermohonan/edit/:id" element={<JenisPermohonanEdit />} />
        <Route path="/jenispermohonan/detail/:id" element={<JenisPermohonanFormDetail />} />
        <Route path="/jenisjangkawaktu" element={<JenisJangkaWaktuList />} />
        <Route path="/jenisjangkawaktu/tambah" element={<JenisJangkaWaktuFormAdd />} />
        <Route path="/jenisjangkawaktu/edit/:id" element={<JenisJangkaWaktuFormEdit />} />
        <Route path="/JenisJangkaWaktu/detail/:id" element={<DetailJenisJangkaWaktu />} />
        <Route path="/jangkawaktusewa" element={<JangkaWaktuSewaList />} />
        <Route path="/jangkawaktusewa/tambah" element={<JangkaWaktuSewaFormAdd />} />
        <Route path="/jangkawaktusewa/edit/:id" element={<JangkaWaktuSewaFormEdit />} />
        <Route path="/JangkaWaktuSewa/detail/:id" element={<DetailJangkaWaktuSewa />} />
        <Route path="/lokasiobjekretribusi" element={<LokasiObjekRetribusiList />} />
        <Route path="/lokasiobjekretribusi/add" element={<LokasiObjekRetribusiFormAdd />} />
        <Route path="/lokasiobjekretribusi/edit/:id" element={<LokasiObjekRetribusiFormEdit />} />
        <Route path="/jenisobjekretribusi" element={<JenisObjekRetribusiList />} />
        <Route path="/jenisobjekretribusi/create" element={<JenisObjekRetribusiFormAdd />} />
        <Route path="/jenisobjekretribusi/edit/:id" element={<JenisObjekRetribusiFormEdit />} />
        <Route path="/jenisobjekretribusi/detail/:id" element={<JenisObjekRetribusiFormDetail />} />
        <Route path="/objekretribusi" element={<ObjekRetribusiList />} />
        <Route path="/objekretribusi/create" element={<ObjekRetribusiFormAdd />} />
        <Route path="/objekretribusi/edit/:id" element={<ObjekRetribusiFormEdit />} />
        <Route path="/jenisstatus" element={<JenisStatusList />} />
        <Route path="/jenisstatus/add" element={<JenisStatusFormAdd />} />
        <Route path="/jenisstatus/edit/:id" element={<JenisStatusFormEdit />} />
        <Route path="/status" element={<StatusList />} />
        <Route path="/status/tambah" element={<StatusFormAdd />} />
        <Route path="/status/edit/:id" element={<StatusFormEdit />} />
        <Route path="/peruntukansewa" element={<PeruntukanSewaList />} />
        <Route path="/peruntukansewa/add" element={<PeruntukanSewaFormAdd />} />
        <Route path="/peruntukansewa/edit/:id" element={<PeruntukanSewaFormEdit />} />
        <Route path="/wajibretribusi" element={<WajibRetribusiList />} />
        <Route path="/wajibretribusi/tambah" element={<WajibRetribusiAdd />} />
        <Route path="/wajibretribusi/edit/:id" element={<WajibRetribusiEdit />} />
        <Route path="/tarifobjekretribusi" element={<TarifObjekRetribusiList />} />
        <Route path="/tarifobjekretribusi/add" element={<TarifObjekRetribusiFormAdd />} />
        <Route path="/tarifobjekretribusi/edit/:id" element={<TarifObjekRetribusiFormEdit />} />
        <Route path="/permohonansewa" element={<PermohonanSewaList />} />
        <Route path="/permohonansewa/add" element={<PermohonanSewaFormAdd />} />
        <Route path="/permohonansewa/edit/:id" element={<PermohonanSewaFormEdit />} />
        <Route path="/permohonansewa/detail/:id" element={<DetailPermohonanSewa />} />
        <Route path="/lokasiobjekretribusi/show/:id" element={<LokasiObjekRetribusiDetail />} />
        <Route path="/objekretribusi/show/:id" element={<ObjekRetribusiDetail />} />
        <Route path="/tarif/show/:id" element={<TarifObjekRetribusiDetail />} />
        <Route path="/jenis-status/:id" element={<ShowJenisStatus />} />
        <Route path="/peruntukansewa/:id" element={<PeruntukanSewaDetail />} />
        <Route path="/status/:id" element={<StatusDetail />} />
        <Route path="/wajibretribusi/show/:id" element={<WajibRetribusiDetail />} />
        <Route path="/user/detail/:id" element={<UserDetail />} />
      </Routes>
    </Layout>
  );
}

// Auth checker component to verify login status
function AuthChecker() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);
  
  if (loading) {
    // Show loading while checking authentication
    return <div>Loading...</div>;
  }
  
  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If user is authenticated and trying to access login page
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return null;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
