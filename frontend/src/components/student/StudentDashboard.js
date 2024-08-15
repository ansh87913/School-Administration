import React from 'react';
import Sidebar from '../Sidebar';

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar userType="student" />
      <div className="content">
        <h1>Student Dashboard</h1>
        {/* Dummy content goes here */}
      </div>
    </div>
  );
};

export default StudentDashboard;
