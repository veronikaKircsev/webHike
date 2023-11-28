require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();
const port = 30000;

app.use(cors());

console.log(process.env.PGPASSWORD)
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})

console.log("hello");

const sqlQuery = "select lastname from northwind.employee";

// Endpoint to test database connectivity
app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select lastname, firstname from northwind.employee");
        client.release();
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});