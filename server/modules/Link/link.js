const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const LinkSchema = new Schema({
  VideoTitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  Videolink: { type: String, required: true },
  Options: { type: [String], required: false },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});
// on every save, add the date
LinkSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.slug = slugify(this.VideoTitle);
  next();
});

module.exports = Link = mongoose.model('link', LinkSchema);
