const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  VideoTitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  Videolink: { type: String, required: true },
  Options: { type: [String], required: false },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Link = mongoose.model('link', LinkSchema);
