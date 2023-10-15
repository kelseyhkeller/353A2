'use strict';

const app = require('./app'); // Import your Express application from app.js (or another file where you define it)
const http = require('http');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000; // You can specify the port you want to listen on, and use an environment variable as a fallback
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
