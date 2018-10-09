const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  NewsTitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  NewsImage: { type: String, required: true },
  Added_at: { type: Date, default: Date.now },
});

module.exports = News = mongoose.model('news', NewsSchema);
