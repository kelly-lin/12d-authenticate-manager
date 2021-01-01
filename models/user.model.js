import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessLevel: { type: Number, required: true },
  projectApproved: { type: String, required: true },
  lastActive: Date,
  projectCode: String,
  dateRequested: Date,
  dateAuthenticated: Date,
  authenticatedBy: String,
  expiryDate: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;