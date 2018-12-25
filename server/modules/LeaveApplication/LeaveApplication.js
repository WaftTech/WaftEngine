const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RemarksDetail = new Schema({
  Remarks: { type: String },
  Date: { type: Date },
  UserID: { type: Schema.Types.ObjectId, ref: 'users' },
  Status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'] },
});

const LeaveApplicationSchema = new Schema({
  Date: { type: Date, default: Date.now, required: true },
  IsHalfDay: { type: Boolean, required: true },
  LeaveTypeID: { type: Schema.Types.ObjectId, ref: 'users' },
  EmployID: { type: Schema.Types.ObjectId, ref: 'users' },
  From: { type: Date, required: true },
  To: { type: Date, required: true },
  NoOfDays: { type: Number, required: true },
  SubmittedTo: { type: String, required: true },
  SubmittedBy: { type: String, required: true },
  Added_by: { type: String, required: true },
  Added_at: { type: Date, default: Date.now, required: true },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_By: { type: Schema.Types.ObjectId },
  Deleted_At: { Date },

  FromIsHalfDay: { type: Boolean, required: true, default: false },
  ToIsHalfDay: { type: Boolean, required: true, default: false },
  Status: { type: String, required: true, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  Remarks: RemarksDetail,
});
module.exports = LeaveApplication = mongoose.model('LeaveApplicationModel', LeaveApplicationSchema);
