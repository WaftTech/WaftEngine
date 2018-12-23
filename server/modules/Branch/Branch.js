const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  BranchName: { type: String, required: true },
  BranchNameNepali: { type: String },
  Address: { type: String, required: true },
  AddressNepali: { type: String },
  ContactNo: { type: Number, required: true },
  Email: { type: String, required: true },
});
module.exports = Branch = mongoose.model('Branch', BranchSchema);
