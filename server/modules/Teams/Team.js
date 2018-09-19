const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user_id: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  added_on: { type: Date },
  updated_at: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model('teams', TeamSchema);
