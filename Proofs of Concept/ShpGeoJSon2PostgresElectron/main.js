const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const fileUpload = require('express-fileupload');
const pg = require('pg');
const shapefile = require('shapefile');
const path = require('path'); 

// Set up Express for file upload
const expressApp = express();
expressApp.use(fileUpload());

// PostgreSQL configuration
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'cenapred_db',
    password: 'cenapred',
    port: 5433,
  };
const client = new pg.Client(dbConfig);

// Electron window
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true, 
      preload: path.join(__dirname, 'preload.js'), 
    },
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Open DevTools (remove this in production)
  mainWindow.webContents.openDevTools();

  // Handle file upload
  ipcMain.on('upload-file', async (event, data) => {
    if (!data.file) {
      event.reply('upload-response', { success: false, message: 'No file provided' });
      return;
    }

    try {
      await client.connect();
      if (data.file.name.endsWith('.shp')) {
        const { shapefileName, shp, shx, dbf } = data.file;
        const shapeData = await shapefile.read(shp, shx, dbf);
      } else if (data.file.name.endsWith('.geojson')) {
        const geojsonData = JSON.parse(data.file.data.toString());
      }

      event.reply('upload-response', { success: true, message: 'File uploaded successfully' });
    } catch (error) {
      event.reply('upload-response', { success: false, message: error.message });
    } finally {
      await client.end();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

// Start Express server for uploading layers
expressApp.listen(3000, () => {
  console.log('File upload server is running on port 3000');
});
