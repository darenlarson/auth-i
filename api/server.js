const express = require('express');
const router = require('../routes/router.js');
const configureMiddleware = require('../config/middleware.js');

const server = express();

// middleware
configureMiddleware(server);

// routes
server.use('/api', router);

// export server
module.exports = server;