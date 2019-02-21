const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqCatSchema = new schema({
  title: { type: String, required: true },
  slug_url: { type: String },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = faqCat = mongoose.model('faqcat', faqCatSchema);
