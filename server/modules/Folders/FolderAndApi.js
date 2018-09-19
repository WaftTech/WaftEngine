const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  name: { type: String, required: true },
  subfolder :[{type:Schema.Types.ObjectId , ref: 'folders'}],
  api :[{type:Schema.Types.ObjectId , ref: 'apis'}],
  project :[{type:Schema.Types.ObjectId , ref: 'projects'}],
  added_by : { type: Schema.Types.ObjectId , ref: 'users' },
  added_on :{ type: Date },
  updated_at: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model('folders', FolderSchema);
