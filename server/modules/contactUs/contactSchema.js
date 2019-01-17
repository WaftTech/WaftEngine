const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String, required: false },
  is_deleted: { type: Boolean, required: true, default: false },
  added_at: { type: Date, default: Date.now, required: false },
});
module.exports = Contact = mongoose.model('contact', contactSchema);
