const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessLevel: Number,
  projectApproved: { type: String, required: true },
  projectCode: { type:String, required: true },
  lastActive: Date,
  dateRequested: Date,
  dateAuthenticated: Date,
  authenticatedBy: String,
  expiryDate: Date,
  isPending: { type: Boolean, required: true }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;