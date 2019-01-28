const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contentSchema = new schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  publish_from: { type: Date, required: false },
  publish_to: { type: Date, required: false },
  is_active: { type: Boolean, required: true, default: false },
  is_feature: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  added_at: { type: Date, default: Date.now },
});

module.exports = Content = mongoose.model('content', contentSchema);
