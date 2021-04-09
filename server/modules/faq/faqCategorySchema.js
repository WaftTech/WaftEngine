const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqCatSchema = new schema({
  title: { type: String },
  key: { type: String },
  slug_url: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = faqCat = mongoose.model('faqcat', faqCatSchema);
