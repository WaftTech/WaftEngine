const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});
module.exports = LeaveApplication = mongoose.model('LeaveApplicationModel', LeaveApplicationSchema);
