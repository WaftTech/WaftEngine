const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyNameNepali: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  addressNepali: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  contactPersonNepali: {
    type: String,
  },
  email: {
    type: String,
  },
  web: {
    type: String,
  },
  pan: {
    type: String,
  },
});

let companyModel = mongoose.model('company', companySchema);

module.exports = companyModel;
