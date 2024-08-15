import React, { useState, useEffect } from "react";
import Axios from "axios";
import { EntityRow } from "../principal/EntityRow";
import Sidebar from "../Sidebar";

const TeacherStudentList = ({ teacherId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (teacherId) {
      Axios.get(`https://school-administration-6.onrender.com/classroom/teacher/${teacherId}`)
        .then(res => {
          if (res.status === 200) {
            setStudents(res.data.students);
          } else {
            alert("Error fetching students");
          }
        })
        .catch(err => alert(err));
    }
  }, [teacherId]);
  

  const handleDelete = (studentId) => {
    Axios.delete(`https://school-administration-6.onrender.com/classroom/teacher/student/${teacherId}/${studentId}`)
      .then(res => {
        if (res.status === 200) {
          setStudents(students.filter(student => student._id !== studentId));
          alert("Student removed from classroom successfully");
        } else {
          alert("Error removing student");
        }
      })
      .catch(err => alert(err));
  };

  const handleSave = (updatedStudent) => {
    setStudents(students.map(student => student._id === updatedStudent._id ? updatedStudent : student));
  };

  return (
    <div className="dashboard">
      <Sidebar userType="teacher" />
      <div className="content">
        <h2>My Classroom Students</h2>
        <table className="table table-bordered table-success">
          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <EntityRow
                key={student._id}
                entity={student}
                entityType="student"
                onDelete={handleDelete}
                onSave={handleSave}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherStudentList;
