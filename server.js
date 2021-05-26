//imports express
const express = require('express');
const mysql = require('mysql2');

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
//querying the database to test connection
// db.query( `SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });
//get a single candidate
//  delete a candidate
// db.query(`DELETE FROM candidates WHERE id=?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
//create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
//GET route to handle user requests, Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});