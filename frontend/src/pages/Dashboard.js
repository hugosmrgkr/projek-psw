import React from 'react';

const Dashboard = () => {
  return (
    <>
      <h3 className="font-weight-bold">Welcome Admin</h3>
      <h6 className="font-weight-normal mb-4">
        All systems are running smoothly! You have
        <span className="text-primary"> 3 unread alerts!</span>
      </h6>

      {/* Statistik atau card langsung di sini */}
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card tale-bg">
            <div className="card-people mt-auto">
              <img src="assets-admin/images/dashboard/people.svg" alt="people" />
              <div className="weather-info">
                <div className="d-flex">
                  <div>
                    <h2 className="mb-0 font-weight-normal">
                      <i className="icon-sun mr-2"></i>31<sup>C</sup>
                    </h2>
                  </div>
                  <div className="ml-2">
                    <h4 className="location font-weight-normal">Bangalore</h4>
                    <h6 className="font-weight-normal">India</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* dst... */}
      </div>
    </>
  );
};

export default Dashboard;
