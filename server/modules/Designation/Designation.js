const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesignationSchema = new Schema({
  Designation: { type: String, required: true },
  DesignationNepali: { type: String },

  IsActive: { type: Boolean, required: true, default: false },
  Added_by: {
    type: Schema.Types.ObjectId,
  },
  update_date: { type: Date, required: true, default: Date.now },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_by: { type: Schema.Types.ObjectId },
  Deleted_at: { Date },
});

module.exports = Designation = mongoose.model('Designation', DesignationSchema);
