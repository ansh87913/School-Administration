import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import PrincipalDashboard from './components/principal/PrincipalDashboard';
import StudentClassList from './components/student/StudentClassList';

import { CreateEntity } from './components/principal/CreateEntity';
import { EntityList } from './components/principal/EntityList';
import { CreateClassroom } from './components/principal/CreateClassroom';
import TeacherStudentList from './components/teacher/TeacherStudentList';
import { CreateStudent } from './components/teacher/CreateStudent';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userType, setUserType] = React.useState('');
  const [userId, setUserId] = React.useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} setUserId={setUserId} />}
          />
          {isAuthenticated ? (
            <>
              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={userType === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/student/classes"
                element={userType === 'student' ? <StudentClassList studentId={userId} /> : <Navigate to="/login" />}
              />

              {/* Teacher Routes */}
              <Route
                path="/teacher/dashboard"
                element={userType === 'teacher' ? <TeacherDashboard teacherId={userId} /> : <Navigate to="/login" />}
              />
              <Route
                path="/teacher/schedule"
                element={userType === 'teacher' ? <CreateStudent teacherId={userId} /> : <Navigate to="/login" />}
              />
              <Route
                path="/teacher/students"
                element={userType === 'teacher' ? <TeacherStudentList teacherId={userId} /> : <Navigate to="/login" />}
              />


              {/* Principal Routes */}
              <Route
                path="/principal/dashboard"
                element={userType === 'principal' ? <PrincipalDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/principal/create"
                element={userType === 'principal' ? <CreateEntity /> : <Navigate to="/login" />}
              />
              <Route
                path="/principal/get"
                element={userType === 'principal' ? <EntityList /> : <Navigate to="/login" />}
              />
              <Route
                path="/principal/classroom"
                element={userType === 'principal' ? <CreateClassroom /> : <Navigate to="/login" />}
              />

              <Route path="*" element={<Navigate to={`/${userType}/dashboard`} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
