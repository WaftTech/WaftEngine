const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date_of_birth: { type: Date },
  email_verification_code: { type: String },
  email_verified: { type: Boolean, required: true, default: false },
  password_reset_code: { type: String },
  password_reset_request_date: { type: Date },
  last_password_cahnage_date: { type: Date },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  is_active: { type: Boolean, required: true, default: false },
  is_added_by_admin: { type: Boolean, require: true, default: false },
  roles: [{ type: [Schema.Types.ObjectId], require: true, ref: 'roles' }],
  bio: { type: String },
  skills: { type: [String] },
  description: { type: String },
  IsDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  Deleted_by: {
    type: Schema.Types.ObjectId,
  },
  Deleted_at: {
    type: Date,
  },
});

module.exports = User = mongoose.model('users', UserSchema);
