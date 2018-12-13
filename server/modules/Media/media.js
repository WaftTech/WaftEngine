const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  Description: { type: String, required: false },
  MediaImage: { type: Schema.Types.Mixed, required: false },
  fieldname: { type: String, required: false },
  originalname: { type: String, required: false },
  encoding: { type: String, required: false },
  mimetype: { type: String, required: false },
  type: { type: String, required: false },
  destination: { type: String, required: false },
  filename: { type: String, required: false },
  path: { type: String, required: false },
  size: { type: Number, required: false },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_at: { type: Date, required: false },
  Deleted_by: { type: Schema.Types.ObjectId, required: false },
  Added_at: { type: Date, default: Date.now },
  Added_by: { type: Schema.Types.ObjectId, required: true }
});

module.exports = Media = mongoose.model("media", MediaSchema);
