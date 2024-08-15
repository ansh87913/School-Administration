import React from 'react';
import Sidebar from '../Sidebar';

const StudentAttendance = () => {
  return (
    <div className="dashboard">
      <Sidebar userType="student" />
      <div className="content">
        <h1>Student Attendance Page</h1>
        {/* Add the attendance content here */}
      </div>
    </div>
  );
};

export default StudentAttendance;
