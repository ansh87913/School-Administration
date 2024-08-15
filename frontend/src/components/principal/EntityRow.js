import React, { useState } from "react";
import Axios from "axios";

export function EntityRow({ entity, entityType, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(entity);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await Axios.put(`https://school-administration-6.onrender.com/auth/update/${entityType}/${entity._id}`, editData);
      if (response.status === 200) {
        onSave(editData); // Update the parent state with the new data
        setIsEditing(false);
        alert("Record updated successfully");
      } else {
        alert("Error updating record");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await Axios.delete(`https://school-administration-6.onrender.com/auth/delete/${entityType}/${entity._id}`);
      if (response.status === 200) {
        onDelete(entity._id); // Remove the entity from the parent state
        alert("Record deleted successfully");
      } else {
        alert("Error deleting record");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        ) : (
          entity.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="registerNo"
            value={editData.registerNo}
            onChange={handleInputChange}
            className="form-control"
          />
        ) : (
          entity.registerNo
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="email"
            name="username"
            value={editData.username}
            onChange={handleInputChange}
            className="form-control"
          />
        ) : (
          entity.username
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSaveClick} className="btn btn-success">
            Save
          </button>
        ) : (
          <>
            <button onClick={handleEditClick} className="btn btn-primary">
              Edit
            </button>
            <button onClick={handleDeleteClick} className="btn btn-danger mx-2">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
