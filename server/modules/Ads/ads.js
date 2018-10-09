const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const AdsSchema = new Schema({
  AdsName: { type: String, required: true },
  slug: { type: String, required: true },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: true },
  PublishTo: { type: Date, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  AdsImage: { type: String, required: true },
  Added_at: { type: Date, default: Date.now },
});

// on every save, add the date
AdsSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.slug = slugify(this.AdsName);
  next();
});
module.exports = Ads = mongoose.model('ads', AdsSchema);
