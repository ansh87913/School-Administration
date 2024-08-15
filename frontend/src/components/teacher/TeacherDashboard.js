import React from 'react';
import Sidebar from '../Sidebar';

const TeacherDashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar userType="teacher" />
      <div className="content">
        <h1>Teacher Dashboard</h1>
        {/* Dummy content goes here */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
