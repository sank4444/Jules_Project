import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  const handleEmployeeDeleted = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <AddEmployee onEmployeeAdded={handleEmployeeAdded} />
      <EmployeeList
        employees={employees}
        onEmployeeUpdated={handleEmployeeUpdated}
        onEmployeeDeleted={handleEmployeeDeleted}
      />
    </div>
  );
}

export default App;
