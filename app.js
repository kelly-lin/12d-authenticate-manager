const express = require('express');
const cors = require('cors');
const app = express();

// Add middleware
app.use(cors());
app.use(express.json());

// Add routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const pendingRouter = require('./routes/pending');
app.use('/pending', pendingRouter);

module.exports = app;