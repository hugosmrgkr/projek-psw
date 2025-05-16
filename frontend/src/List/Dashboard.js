import { useState } from "react";

export default function AdminDashboardContent() {
  const [hoverHeading, setHoverHeading] = useState(false);
  const [hoverText, setHoverText] = useState(false);

  return (
    <div className="container py-4">
      {/* Welcome Card */}
      <div
        className={`p-4 rounded bg-primary text-white mb-5 shadow-sm ${
          hoverHeading ? "bg-gradient" : ""
        }`}
        onMouseEnter={() => setHoverHeading(true)}
        onMouseLeave={() => setHoverHeading(false)}
        style={{ transition: "background-color 0.3s ease" }}
      >
        <h1 className="display-5 fw-bold">
          Selamat Datang, Admin! <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p
          className={`lead ${hoverText ? "text-warning" : ""}`}
          onMouseEnter={() => setHoverText(true)}
          onMouseLeave={() => setHoverText(false)}
          style={{ transition: "color 0.3s ease" }}
        >
          Semoga harimu menyenangkan
        </p>
      </div>

      {/* Dashboard Stats Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Users</h5>
              <p className="display-6 fw-bold mb-0">1,245</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Reports</h5>
              <p className="display-6 fw-bold mb-0">567</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Settings</h5>
              <p className="display-6 fw-bold mb-0">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
