import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../Sidebar";

export function CreateClassroom() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showTeacherList, setShowTeacherList] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [classroomData, setClassroomData] = useState({
    registerNo: "",
    duration: {
      Monday: { startTime: "", endTime: "" },
      Tuesday: { startTime: "", endTime: "" },
      Wednesday: { startTime: "", endTime: "" },
      Thursday: { startTime: "", endTime: "" },
      Friday: { startTime: "", endTime: "" },
      Saturday: { startTime: "", endTime: "" },
      Sunday: { startTime: "", endTime: "" }
    }
  });

  useEffect(() => {
    // Fetch teachers
    Axios.get("https://school-administration-6.onrender.com/auth/fetch/teacher")
      .then((res) => {
        if (res.status === 200) {
          setTeachers(res.data.users);
        }
      })
      .catch((err) => alert("Error fetching teachers"));

    // Fetch students
    Axios.get("https://school-administration-6.onrender.com/auth/fetch/student")
      .then((res) => {
        if (res.status === 200) {
          setStudents(res.data.users);
        }
      })
      .catch((err) => alert("Error fetching students"));
  }, []);

  const handleAddTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleAddStudent = (student) => {
    if (!selectedStudents.some((s) => s._id === student._id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents(
      selectedStudents.filter((student) => student._id !== studentId)
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassroomData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDurationChange = (day, field, value) => {
    setClassroomData((prevState) => ({
      ...prevState,
      duration: {
        ...prevState.duration,
        [day]: {
          ...prevState.duration[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedTeacher) {
      alert("Please select a teacher");
      return;
    }

    // Set default values for startTime and endTime if not provided
    const filledDuration = {};
    for (const day in classroomData.duration) {
      const { startTime, endTime } = classroomData.duration[day];
      filledDuration[day] = {
        startTime: startTime || "00:00",  // Default startTime
        endTime: endTime || "23:45"  // Default endTime
      };
    }

    const classroom = {
      ...classroomData,
      duration: filledDuration,
      teacherId: selectedTeacher._id,
      studentIds: selectedStudents.map((student) => student._id),
    };

    Axios.post("https://school-administration-6.onrender.com/classroom/create", classroom)
      .then((res) => {
        if (res.status === 200) {
          alert("Classroom created successfully");
        } else {
          alert("Error creating classroom");
        }
      })
      .catch((err) => {
        console.error(err.message);
        alert("Server error: " + err.message);
      });
  };

  const renderTimeDropdown = (selectedValue, handleChange) => (
    <select
      className="form-control"
      value={selectedValue}
      onChange={(e) => handleChange(e.target.value)}
      required
    >
      <option value="">Select Time</option>
      {[...Array(24).keys()].map((hour) =>
        ["00", "15", "30", "45"].map((minute) => (
          <option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
            {`${hour < 10 ? `0${hour}` : hour}:${minute}`}
          </option>
        ))
      )}
    </select>
  );

  return (
    <div className="dashboard">
      <Sidebar userType="principal" />
      <div className="content">
        <h2>Create Classroom</h2>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="form-group">
            <label>Classroom Registration No:</label>
            <input
              type="text"
              name="registerNo"
              value={classroomData.registerNo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group my-4">
            <label>Classroom Duration:</label>
            <table className="table table-bordered table-warning">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(classroomData.duration).map((day) => (
                  <tr key={day}>
                    <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                    <td>
                      {renderTimeDropdown(
                        classroomData.duration[day].startTime,
                        (value) => handleDurationChange(day, "startTime", value)
                      )}
                    </td>
                    <td>
                      {renderTimeDropdown(
                        classroomData.duration[day].endTime,
                        (value) => handleDurationChange(day, "endTime", value)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form-group my-4">
            <label>Selected Teacher:</label>
            <input
              type="text"
              className="form-control"
              value={
                selectedTeacher
                  ? `${selectedTeacher.name} (${selectedTeacher.username})`
                  : ""
              }
              readOnly
              required
            />
          </div>

          <div className="form-group my-4">
            <button
              type="button"
              className="btn btn-secondary mb-2 btn-danger"
              onClick={() => setShowTeacherList(!showTeacherList)}
            >
              {showTeacherList ? "Hide" : "Show"} Teacher List
            </button>
            {showTeacherList && (
              <table className="table table-bordered table-warning">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Register No</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.registerNo}</td>
                      <td>{teacher.username}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddTeacher(teacher)}
                          disabled={
                            selectedTeacher && selectedTeacher._id === teacher._id
                          }
                        >
                          {selectedTeacher && selectedTeacher._id === teacher._id
                            ? "Selected"
                            : "Add"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="form-group my-4">
            <label>Selected Students:</label>
            <ul className="list-group">
              {selectedStudents.map((student) => (
                <li
                  key={student._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {student.name} ({student.username})
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveStudent(student._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-group my-4">
            <button
              type="button"
              className="btn btn-secondary mb-2 btn-danger"
              onClick={() => setShowStudentList(!showStudentList)}
            >
              {showStudentList ? "Hide" : "Show"} Student List
            </button>
            {showStudentList && (
              <table className="table table-bordered table-warning">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Register No</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.registerNo}</td>
                      <td>{student.username}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleAddStudent(student)}
                          disabled={selectedStudents.some(
                            (s) => s._id === student._id
                          )}
                        >
                          {selectedStudents.some((s) => s._id === student._id)
                            ? "Selected"
                            : "Add"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="form-group my-4" style={{display:"flex", justifyContent:"center"}}>
            <button type="submit" className="btn btn-success">
              Create Classroom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
