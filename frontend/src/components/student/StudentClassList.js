import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../Sidebar";

const StudentClassList = ({ studentId }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (studentId) {
        console.log(studentId)
      Axios.get(`https://school-administration-6.onrender.com/classroom/student/${studentId}`)
        .then(res => {
          if (res.status === 200) {
            setClasses(res.data.classrooms);
          } else {
            alert("Error fetching classes");
          }
        })
        .catch(err => alert(err));
    }
  }, [studentId]);

  return (
    <div className="dashboard">
      <Sidebar userType="student" />
      <div className="content">
        {classes.map(classroom => (
          <div key={classroom._id}>
            <h3>Class No: {classroom.registerNo}</h3>
            <table className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Register No</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {classroom.studentIds.map(student => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNo}</td>
                    <td>{student.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClassList;
