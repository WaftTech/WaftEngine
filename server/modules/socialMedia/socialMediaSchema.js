const mongoose = require('mongoose');
const schema = mongoose.Schema;

const socialMediaSchema = new schema({
  url: { type: String, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = socialMedia = mongoose.model('socialMedia', socialMediaSchema);
