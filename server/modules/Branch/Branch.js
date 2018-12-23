const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  BranchName: { type: String, required: true },
  BranchNameNepali: { type: String },
  Address: { type: String, required: true },
  AddressNepali: { type: String },
  ContactNo: { type: String, required: true },
  Email: { type: String, required: true },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_By: { type: Schema.Types.ObjectId },
  Deleted_At: { Date },
});
module.exports = Branch = mongoose.model('Branch', BranchSchema);
