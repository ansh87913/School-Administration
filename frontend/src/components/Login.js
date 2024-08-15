import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsAuthenticated, setUserType, setUserId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!type) {
      setError('Please select user type');
      return;
    }
  
    try {
      const response = await axios.post(`https://school-administration-6.onrender.com/auth/login/${type}`, { username, password });
      if (response.data.success) {
        setIsAuthenticated(true);
        setUserType(type);
        setUserId(response.data.userDetails._id); // Set the user ID
        console.log("User ID:", response.data.userDetails._id); // For debugging
        navigate(`/${type}/dashboard`);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Login failed');
    }
  };
  

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>User Type</label>
            <div className="d-flex justify-content-around">
              <div className="form-check">
                <input
                  type="radio"
                  id="student"
                  name="userType"
                  className="form-check-input"
                  onChange={() => setType('student')}
                />
                <label htmlFor="student" className="form-check-label">Student</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="teacher"
                  name="userType"
                  className="form-check-input"
                  onChange={() => setType('teacher')}
                />
                <label htmlFor="teacher" className="form-check-label">Teacher</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="principal"
                  name="userType"
                  className="form-check-input"
                  onChange={() => setType('principal')}
                />
                <label htmlFor="principal" className="form-check-label">Principal</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
