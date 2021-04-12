const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  company: { type: String, required: true },
  image: { type: Schema.Types.ObjectId, required: true, ref: 'file' },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  added_at: { type: Date, default: new Date() },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: Schema.Types.ObjectId, ref: 'users' },
  deleted_by: { type: Schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  is_deleted: { type: Boolean, default: false },
});

module.exports = Testimonial = mongoose.model('testimonial', testimonialSchema);
