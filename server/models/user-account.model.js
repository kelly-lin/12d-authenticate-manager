const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAccountSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean
});

module.exports = mongoose.model('UserAccount', userAccountSchema);