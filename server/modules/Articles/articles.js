const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const ArticleSchema = new Schema({
  ArticleName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  ArticleImage: { type: String, required: true },
  Added_at: { type: Date, default: Date.now },
});
// on every save, add the date
ArticleSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.slug = slugify(this.ArticleName + this.Added_at);
  next();
});
module.exports = Article = mongoose.model('article', ArticleSchema);
