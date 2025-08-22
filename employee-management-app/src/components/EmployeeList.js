import React, { useState } from 'react';
import EditEmployee from './EditEmployee';

const EmployeeList = ({ employees, onEmployeeUpdated, onEmployeeDeleted }) => {
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        onEmployeeDeleted(id); // Notify parent to update state
        alert('Employee deleted successfully.');
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee. Please try again.');
      }
    }
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    onEmployeeUpdated(updatedEmployee); // Notify parent to update state
    setEditingEmployee(null); // Close the modal
    alert('Employee updated successfully.');
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>
                <button onClick={() => setEditingEmployee(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <EditEmployee
          employee={editingEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
          onCancel={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
