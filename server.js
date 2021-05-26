//imports express
const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

//adding the PORT and app expression
const PORT = process.env.PORT || 3012;
const app = express();

//adding the Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//connection to the database(mysql)
const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username
        user: 'root',
        //MySQL passwoor
        password: 'Loralai!76',
        database:'election'
    },
    console.log('Connected to the election database.')
);
//get all candidates, wrapped in an Express.js route
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

db.query( `SELECT * FROM candidates`, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message});
        return;
    }
    res.json ({
        message: 'success',
        data: rows
        });
    });
});
//get a single candidate, wrapped in an Express.js route
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
//  delete a candidate, wrapped in an Express.js route
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


//create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
        });
    });
});
//GET route to handle user requests, Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});