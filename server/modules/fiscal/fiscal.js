const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { slugify } = require("../../helper/others.helper");

const FiscalSchema = new Schema({
  FiscalYear: { type: String, required: true },
  From: { type: Date, required: true },
  To: { type: Date, required: true },
  IsCurrent: { type: Boolean, required: true, default: false },
  IsActive: { type: Boolean, required: true, default: false },
  Created_by: { type: Schema.Types.ObjectId, required: false },
  CreatedDate: { type: Date, default: Date.now }
});

module.exports = Fiscal = mongoose.model("fiscal", FiscalSchema);
