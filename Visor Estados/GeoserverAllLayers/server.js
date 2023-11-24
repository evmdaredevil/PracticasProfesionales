const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy requests to GeoServer
app.use('/geoserver', createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
}));

// Serve static files (replace 'public' with the actual folder name containing your HTML file)
app.use(express.static('public'));

const PORT = 5500; // Use the desired port number
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
