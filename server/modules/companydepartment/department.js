const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentNameNepali: {
    type: String,
  },
  numberofStaff: {
    type: Number,
    required: true,
  },
  IsDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  Deleted_by: {
    type: Schema.Types.ObjectId,
  },
  Deleted_at: {
    type: Date,
  },
});

const departmentModel = mongoose.model('department', departmentSchema);

module.exports = departmentModel;
