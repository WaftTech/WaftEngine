const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  email_verification_code: { type: String },
  email_verified: { type: Boolean, required: false, default: false },
  password_reset_code: { type: String },
  password_reset_request_date: { type: Date },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  is_added_by_admin: { type: Boolean, require: true, default: false },
  roles: [{ type: [Schema.Types.ObjectId], require: true, ref: 'roles' }],
});

module.exports = User = mongoose.model('users', UserSchema);
