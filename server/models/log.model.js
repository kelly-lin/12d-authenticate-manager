const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = Schema({
  date: Date,
  username: String,
  macroName: String,
  projectName: String,
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;