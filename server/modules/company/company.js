const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  Name: { type: String, required: true },
  Image: { type: Schema.Types.Mixed, required: true },
  Description: { type: String, required: true },
  IsActive: { type: String, required: true, default: false },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_at: { type: Date, required: false },
  Deleted_by: { type: Schema.Types.ObjectId, required: false },
  Added_at: { type: Date, default: Date.now },
  Added_by: { type: Schema.Types.ObjectId, required: false },
});

module.exports = Company = mongoose.model('company', CompanySchema);
