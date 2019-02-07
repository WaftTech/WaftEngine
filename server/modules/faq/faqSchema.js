const mongoose = require('mongoose');
const schema = mongoose.Schema;

const faqSchema = new schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  category: { type: schema.Types.ObjectId, ref: 'faqcat' },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, required: true, default: false },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now },
});
module.exports = faq = mongoose.model('faq', faqSchema);
