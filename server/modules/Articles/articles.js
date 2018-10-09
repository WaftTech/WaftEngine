const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = Article = mongoose.model('article', ArticleSchema);
