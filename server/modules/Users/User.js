const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressdetail = new Schema({
  state: { type: Schema.Types.ObjectId, ref: 'State' },
  district: { type: Schema.Types.ObjectId, ref: 'Disctrict' },
  vdc: { type: Schema.Types.ObjectId, ref: 'VdcMunicipality' },
  wardno: { type: Number },
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  nameNepali: { type: String },
  designation: { type: Schema.Types.ObjectId, ref: 'Designation' },
  Gender: { type: String, required: true, enum: [ 'Male', 'Female', 'Other'] },
  citrollno: { type: String },
  permanentaddress: addressdetail,
  tempaddress: addressdetail,
  is_active: { type: Boolean, default: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // avatar: { type: String },
  avatar: { type: Schema.Types.Mixed },
  email_verification_code: { type: String },
  email_verified: { type: Boolean, required: false, default: false },
  password_reset_code: { type: String },
  password_reset_request_date: { type: Date },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  ReporterID: { type: [Schema.Types.ObjectId], ref: 'users'},
  is_added_by_admin: { type: Boolean, require: true, default: false },
  roles: [{ type: [Schema.Types.ObjectId], require: true, ref: 'roles' }],
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
