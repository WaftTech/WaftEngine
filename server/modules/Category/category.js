const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  CategoryName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  CategoryImage: { type: String, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Category = mongoose.model('category', CategorySchema);
