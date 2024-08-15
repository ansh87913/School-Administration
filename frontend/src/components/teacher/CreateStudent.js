import React, { useState } from "react";
import Sidebar from '../Sidebar';
import Axios from "axios";

export function CreateStudent() {
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    username: "",
    password: "",
    type: "student"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, registerNo, username, password, type } = formData;
    Axios.post(`https://school-administration-6.onrender.com/auth/create/${type}`, { name, registerNo, username, password })
      .then(res => {
        if (res.status === 200) {
          alert("Record added successfully");
        } else {
          alert("Error adding record");
        }
      })
      .catch(err => alert(err));
  };

  return (
    <div className="dashboard">
        <Sidebar userType="teacher" />
    <form onSubmit={handleSubmit} className="content">
      <div style={{ maxWidth: "40%", margin: "0px auto" }}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control my-3"
          placeholder="Enter student name"
          required
        />
        <input
          name="registerNo"
          value={formData.registerNo}
          onChange={handleChange}
          className="form-control my-3"
          placeholder="Enter student register number"
          required
        />
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control my-3"
          placeholder="Enter student username (email)"
          type="email"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control my-3"
          placeholder="Enter student password"
          type="password"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control my-3"
          required
        >
          <option value="student">Student</option>
        </select>
        <button className="btn btn-success my-3" type="submit">
          Create
        </button>
      </div>
    </form>
    </div>
  );
}
