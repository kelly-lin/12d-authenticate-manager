const express = require('express');
const cors = require('cors');
const app = express();

// Add middleware
app.use(cors());
app.use(express.json());

// Add routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const logsRouter = require('./routes/logs');
app.use('/logs', logsRouter);

module.exports = app;