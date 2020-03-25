const mongoose = require('mongoose');
const schema = mongoose.Schema;

const coronaSchema = new schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  age: { type: Number },
  phone_no: { type: String, required: true },
  address_country: { type: String, default: 'Nepal' },
  address_district: { type: String },
  address_address: { type: String },
  symptoms: {
    other: { type: String },
    is_contact_with_corona_infected: { type: Boolean },
    contact_date: { type: Date },
  },
  travel: {
    is_foreign: { type: Boolean },
    country: { type: String },
    detail: { type: String },
  },
  device_id: { type: schema.Types.ObjectId, ref: 'device' },
  added_at: { type: Date, default: Date.now },
});

module.exports = Corona = mongoose.model('corona', coronaSchema);
