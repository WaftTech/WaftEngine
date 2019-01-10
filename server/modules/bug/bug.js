const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BugSchema = new Schema({
  error_message: { type: String, required: true },
  error_stack: { type: String },
  error_type: { type: String },
  AddedAt: { type: Date, default: Date.now },
  AddedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  device: { type: Schema.Types.Mixed },
  ip: { type: Schema.Types.Mixed },
});

module.exports = Bugs = mongoose.model('bugs', BugSchema);
