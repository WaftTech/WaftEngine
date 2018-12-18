const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveTypeSchema = new Schema({
  //ID: { type: number },
  LeaveName: { type: string, required: true },
  IsTransferrable: { type: Boolean, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  IsPaidLeave: { type: Boolean, required: true },
  ApplicableGender: { type: String, required: true, enum: ['All', 'Male', 'Female', 'Other'] },
  NoOfDays: { type: number, required: true },
  IsReplacementLeave: { type: Boolean, required: true },
  Added_at: { type: Date, default: Date.now, required: true },
  Added_by: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = LeaveType = mongoose.model('users', LeaveTypeSchema);
