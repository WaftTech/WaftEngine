const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordpressSchema = new Schema({
 heading: { type: String, required: true },
 title: { type: String, required: true },
 content: { type: String, required: true },
 media:  { type: [ String] },
 media_from_google: { type: String },
 free_photo_library: { type: [String] },
 contact_form: { type: String },
 payment_button: { type: String },
 update_date: { type: Date, required: true, default: Date.now },
 domain: { type: String, required: true },
Isdelete: { type: Boolean, default: false },
});

 module.exports = wordpress = mongoose.model('wordpress',wordpressSchema)
