const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const logSchema = new Schema({
  date: Date,
  username: String,
  macroName: String,
  projectName: String,
});

const Log = mongoose.Model('Log', logSchema);
module.exports = Log;