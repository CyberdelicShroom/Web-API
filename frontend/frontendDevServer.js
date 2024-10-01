const express = require('express');
const path = require('path');
const cors = require('cors');
app.use(cors({ origin: '*' }));
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve static files from the current directory (since server.js is in the same folder as your frontend files)
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Proxy API requests to the backend server
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

const port = 8080;
app.listen(port, () => {
    console.log(`Frontend server running on http://localhost:${port}`);
});