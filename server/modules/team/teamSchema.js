const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String },
  date_of_birth: { type: Date },
  email: { type: String },
  position: { type: String },
  skills: { type: [String] },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  description: { type: String },
  added_at: { type: Date, default: new Date() },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: Schema.Types.ObjectId, ref: 'users' },
  deleted_by: { type: Schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  is_deleted: { type: Boolean, default: false },
});

module.exports = Team = mongoose.model('Team', teamSchema);
