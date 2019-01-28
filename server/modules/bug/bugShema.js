const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bugSchema = new schema({
  error_message: { type: String, required: true },
  error_stack: { type: String },
  error_type: { type: String },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  device: { type: schema.Types.Mixed },
  ip: { type: schema.Types.Mixed },
});

module.exports = Bugs = mongoose.model('bugs', bugSchema);
