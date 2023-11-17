const express = require('express');
const multer = require('multer');
const { Client } = require('pg');
const shapefile = require('shapefile');

const app = express();
const port = 3000;

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// PostgreSQL connection setup
const pgConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'cenapred_db',
  password: 'cenapred',
  port: 5433,
};

app.use(express.static('public')); // Serve HTML file for file upload

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const client = new Client(pgConfig);
    await client.connect();

    if (req.file.originalname.endsWith('.shp')) {
      // Handle Shapefile upload
      const shapeData = await shapefile.read(req.file.buffer);
      const tableName = 'your_table_name'; // Replace with the desired table name

      // Assuming all features have the same structure
      const columns = Object.keys(shapeData.features[0].properties).join(', ');
      const values = shapeData.features.map((feature) => {
        const values = Object.values(feature.properties).map((value) => `'${value}'`);
        return `(${values.join(', ')})`;
      }).join(', ');

      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
      await client.query(createTableQuery);

      const insertDataQuery = `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
      await client.query(insertDataQuery);
    } else if (req.file.originalname.endsWith('.geojson')) {
      // Handle GeoJSON upload
      const tableName = 'TEST-TABLE'; // Replace with the desired table name

      const geojson = JSON.parse(req.file.buffer.toString());
      const features = geojson.features;

      if (features.length === 0) {
        return res.status(400).json({ error: 'GeoJSON file has no features.' });
      }

      const columns = Object.keys(features[0].properties).join(', ');

      const values = features.map((feature) => {
        const values = Object.values(feature.properties).map((value) => `'${value}'`);
        return `(${values.join(', ')})`;
      }).join(', ');

      const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
      await client.query(createTableQuery);

      const insertDataQuery = `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
      await client.query(insertDataQuery);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    await client.end();
    return res.status(200).json({ message: 'File uploaded and data inserted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
