const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  avatar: { type: String },
  is_two_fa: { type: Boolean, default: false },
  two_fa_code: { type: String },
  two_fa_time: { type: Date },
  is_two_fa_ga: { type: Boolean, default: false },
  two_fa_ga_setup: { type: Boolean, default: false },
  two_fa_ga_auth_secret: { type: String },
  two_fa_ga_auth_secret_setup: { type: String },
  image: { type: schema.Types.Mixed },
  date_of_birth: { type: Date },
  email_verification_code: { type: String },
  email_verified: { type: Boolean, required: true, default: false },
  email_verified_request_date: { type: Date },
  password_reset_code: { type: String },
  password_reset_request_date: { type: Date },
  last_password_change_date: { type: Date },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_active: { type: Boolean, required: true, default: false },
  is_added_by_admin: { type: Boolean, require: true, default: false },
  roles: [{ type: [schema.Types.ObjectId], required: true, ref: 'roles' }],
  bio: { type: String },
  register_method: { type: String },
  skills: { type: [String] },
  description: { type: String },
  is_deleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  deleted_by: {
    type: schema.Types.ObjectId,
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = User = mongoose.model('users', userSchema);
