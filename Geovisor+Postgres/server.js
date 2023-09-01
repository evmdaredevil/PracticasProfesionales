const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'cenapred_db',
  password: 'cenapred',
  port: 5433,
};

const client = new Client(dbConfig);
client.connect();

app.use(express.static('public')); 

app.get('/getTables', async (req, res) => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `;

    const result = await client.query(query);
    const tables = result.rows.map(row => row.table_name);
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tables');
  }
});

app.get('/getTableData', async (req, res) => {
  const tableName = req.query.tableName;

  try {
    const query = `SELECT * FROM estados`;
    //const query = `SELECT * FROM ${tableName}`;
    const result = await client.query(query);
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.error('Database Query Error:', err);
    res.status(500).send('Error fetching table data');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
