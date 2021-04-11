const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();

// passport.use(new LocalStrategy(
//   (username, password, done) => {
//     User.findOne
//   }
// ));

// Add middleware
app.use(cors());
app.use(express.json());

// Add routes

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const logsRouter = require('./routes/logs');

app.use('/logs', logsRouter);

module.exports = app;