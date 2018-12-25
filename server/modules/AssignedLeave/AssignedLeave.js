const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AssignedLeaveSchema = new Schema({
  LeaveType: {
    type: Schema.Types.ObjectId,
    ref: 'LeaveTypeModel',
  },
  FiscalYear: {
    type: Schema.Types.ObjectId,
    ref: 'fiscal',
  },
  EmployeeId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  NoOfDays: {
    type: Number,
    required: true,
  },
  LeaveTaken: {
    type: Number,
    required: true,
  },
  LeaveRemaining: {
    type: Number,
    required: true,
  },
  AppliedLeave: {
    type: Number,
    required: true,
  },
  CarryOverLeave: {
    type: Number,
    required: true,
  },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_by: { type: Schema.Types.ObjectId, ref: 'users' },
  Deleted_at: { Date },
});

const AssignedLeave = mongoose.model('assignedleave', AssignedLeaveSchema);

module.exports = AssignedLeave;
