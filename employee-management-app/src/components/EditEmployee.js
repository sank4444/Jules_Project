import React, { useState, useEffect } from 'react';

const EditEmployee = ({ employee, onEmployeeUpdated, onCancel }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = { ...employee, name, position };

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      onEmployeeUpdated(updatedEmployee);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };

  if (!employee) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Position: </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
