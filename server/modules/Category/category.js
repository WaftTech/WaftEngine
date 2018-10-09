const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const CategorySchema = new Schema({
  CategoryName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  CategoryImage: { type: String, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});
// on every save, add the date
CategorySchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.slug = slugify(this.CategoryName);
  next();
});

module.exports = Category = mongoose.model('category', CategorySchema);
