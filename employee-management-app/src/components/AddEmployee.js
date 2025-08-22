import React, { useState } from 'react';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !position) {
      alert('Please fill in all fields');
      return;
    }

    const newEmployee = { name, position };

    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const addedEmployee = await response.json();
      if (onEmployeeAdded) {
        onEmployeeAdded(addedEmployee.data);
      }
      setName('');
      setPosition('');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee Name"
            required
          />
        </div>
        <div>
          <label>Position: </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Employee Position"
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
