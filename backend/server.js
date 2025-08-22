const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// GET all employees
app.get('/api/employees', (req, res) => {
  const sql = "SELECT * FROM employees";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// POST a new employee
app.post('/api/employees', (req, res) => {
  const { name, position } = req.body;
  const sql = 'INSERT INTO employees (name, position) VALUES (?, ?)';
  const params = [name, position];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, name, position }
    });
  });
});

// PUT (update) an employee
app.put('/api/employees/:id', (req, res) => {
  const { name, position } = req.body;
  const sql = 'UPDATE employees SET name = ?, position = ? WHERE id = ?';
  const params = [name, position, req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({
      message: "success",
      data: { id: req.params.id, name, position },
      changes: this.changes
    });
  });
});

// DELETE an employee
app.delete('/api/employees/:id', (req, res) => {
  const sql = 'DELETE FROM employees WHERE id = ?';
  const params = [req.params.id];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({"error": err.message});
      return;
    }
    res.json({ "message": "deleted", changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
