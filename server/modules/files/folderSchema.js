const mongoose = require('mongoose');
const schema = mongoose.Schema;

const folderSchema = new schema({
  name: { type: String, required: true, default: 'New folder' },
  path: { type: String, required: true },
  is_deleted: { type: Boolean, required: true, default: false },
  deleted_at: { type: Date, required: false },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId },
});

module.exports = Folder = mongoose.model('folder', folderSchema);
