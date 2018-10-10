const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const ArticleSchema = new Schema({
  ArticleName: { type: String, required: true },
  slug: { type: String, unique: true },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  ArticleImage: { type: Schema.Types.Mixed, required: true },
  IsDeleted: { type: Boolean, required: true, default: false },
  Added_by: { type: Schema.Types.ObjectId },
  Added_at: { type: Date, default: Date.now },
  Deleted_by: { type: Schema.Types.ObjectId },
  Deleted_at: { type: Date },
});
// on every save, add the date
ArticleSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.slug = slugify(this.ArticleName + this.Added_at);
  next();
});
module.exports = Article = mongoose.model('article', ArticleSchema);
