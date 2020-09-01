const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contentSchema = new schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  publish_from: { type: Date },
  publish_to: { type: Date },
  is_active: { type: Boolean, required: true, default: false },
  is_page: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});

module.exports = Content = mongoose.model('content', contentSchema);
