const mongoose = require('mongoose');
const schema = mongoose.Schema;

const fileSchema = new schema({
  description: { type: String, required: false },
  file_image: { type: schema.Types.Mixed, required: false },
  field_name: { type: String, required: false },
  original_name: { type: String, required: false },
  encoding: { type: String, required: false },
  mimetype: { type: String, required: false },
  type: { type: String, required: false },
  destination: { type: String, required: false },
  filename: { type: String, required: false },
  path: { type: String, required: false },
  size: { type: Number, required: false },
  module: { type: String },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, required: false },
  deleted_by: { type: schema.Types.ObjectId, required: false },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, required: true },
});

module.exports = File = mongoose.model('file', fileSchema);
