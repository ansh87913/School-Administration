import React from 'react';
import Sidebar from '../Sidebar';

const PrincipalDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar userType="principal" />
      <div className="content">
        <h1>Principal Dashboard</h1>
        {/* Dummy content goes here */}
      </div>
    </div>
  );
};

export default PrincipalDashboard;
