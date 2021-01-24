const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const logSchema = Schema({
  date: Date,
  username: String,
  macroName: String,
  projectName: String,
});

logSchema.plugin(mongoosePaginate);

const Log = mongoose.model('Log', logSchema);
module.exports = Log;