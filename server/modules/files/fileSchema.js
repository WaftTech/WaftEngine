const mongoose = require('mongoose');
const schema = mongoose.Schema;

const fileSchema = new schema({
  folder_id: { type: schema.Types.ObjectId, ref: 'folder' },
  original_name: { type: String, required: false },
  encoding: { type: String, required: false },
  mimetype: { type: String, required: false },
  destination: { type: String, required: false },
  filename: { type: String, required: false },
  path: { type: String, required: false },
  size: { type: Number, required: false },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, required: false },
  deleted_by: { type: schema.Types.ObjectId, required: false, ref: 'user' },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'user' },
});

module.exports = File = mongoose.model('file', fileSchema);
