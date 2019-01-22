const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String, required: false },
  IsDeleted: { type: Boolean, required: true, default: false },
  added_at: { type: Date, default: Date.now, required: false },
});
module.exports = Contact = mongoose.model('contact', contactSchema);
