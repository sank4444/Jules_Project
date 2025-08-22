import React, { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';

function App() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Developer' },
  ]);

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <AddEmployee />
      <EmployeeList employees={employees} />
    </div>
  );
}

export default App;
