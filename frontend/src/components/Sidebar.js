import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userType }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        {userType === 'student' && (
          <>
            <Link to="/student/dashboard" className="menu-item">Dashboard</Link>
            <Link to="/student/classes" className="menu-item">Class Students List</Link>
          </>
        )}
        {userType === 'teacher' && (
          <>
            <Link to="/teacher/dashboard" className="menu-item">Dashboard</Link>
            <Link to="/teacher/schedule" className="menu-item">Create Student</Link>
            <Link to="/teacher/students" className="menu-item">My Students</Link>
          </>
        )}
        {userType === 'principal' && (
          <>
            <Link to="/principal/dashboard" className="menu-item">Dashboard</Link>
            <Link to="/principal/create" className="menu-item">Create Entity</Link>
            <Link to="/principal/get" className="menu-item">Fetch Details</Link>
            <Link to="/principal/classroom" className="menu-item">Create Classroom</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
