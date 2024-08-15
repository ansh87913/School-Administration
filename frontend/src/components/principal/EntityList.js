import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar';
import Axios from "axios";
import { EntityRow } from "./EntityRow"; // Importing the EntityRow component

export function EntityList() {
  const [entityType, setEntityType] = useState("");
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    if (entityType) {
      Axios.get(`https://school-administration-6.onrender.com/auth/fetch/${entityType}`)
        .then(res => {
          if (res.status === 200) {
            setEntities(res.data.users);
          } else {
            alert("Error fetching data");
          }
        })
        .catch(err => alert(err));
    }
  }, [entityType]);

  const handleDelete = (id) => {
    setEntities(entities.filter(entity => entity._id !== id));
  };

  const handleSave = (updatedEntity) => {
    setEntities(entities.map(entity => entity._id === updatedEntity._id ? updatedEntity : entity));
  };

  return (
    <div className="dashboard">
      <Sidebar userType="principal" />
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Entity List</h2>
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="form-control"
            style={{ width: "200px" }}
          >
            <option value="">Select Type</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <table className="table table-bordered table-success">
          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((entity) => (
              <EntityRow
                key={entity._id}
                entity={entity}
                entityType={entityType}
                onDelete={handleDelete}
                onSave={handleSave}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
