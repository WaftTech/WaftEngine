const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  team: { type: String, required: true, ref: 'teams' },
  user_id: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  added_on: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model('projects', ProjectSchema);
