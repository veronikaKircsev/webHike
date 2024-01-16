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


// Endpoint to test database connectivity
app.get('/image-name-list-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select * from image_name_of_hike");
        client.release();
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/short-info-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select * from short_info");
        client.release();
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/month-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select * from hikes.month");
        client.release();
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

app.get('/hike-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("select * from hole_hike");
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