const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  email_verification_code: { type: String },
  email_verified: { type: Boolean, required: true, default: false },
  password_reset_code: { type: String },
  password_reset_request_date: { type: Date },
  updated_at: { type: Date, default: Date.now },
  roles: [{ type: [String], require: true }],
});

module.exports = User = mongoose.model('users', UserSchema);
