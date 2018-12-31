const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveTypeSchema = new Schema({
  LeaveName: { type: String, required: true },

  LeaveNameNepali: { type: String },
  IsTransferrable: { type: Boolean, required: true, default:false },
  IsActive: { type: Boolean, required: true, default: true },
  IsPaidLeave: { type: Boolean, required: true, default: true },
  ApplicableGender: { type: String, required: true, enum: ['All', 'Male', 'Female', 'Other'] },
  NoOfDays: { type: Number, required: true },
  IsReplacementLeave: { type: Boolean, required: true, default:false },
  Added_at: { type: Date, default: Date.now, required: true },
  Added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  IsHolidayCount: { type: Boolean, required: true, default: false },

  ApplicableReligion: { type: String, required: true, enum: ['All', 'Hindu', 'Muslim', 'Christian', 'Buddisht', 'Other'] },
  IsCarryOver: { type: Boolean, required: false, default: true },

  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_by: { type: Schema.Types.ObjectId },
  Deleted_at: { Date },
});

module.exports = LeaveType = mongoose.model('LeaveTypeModel', LeaveTypeSchema);
