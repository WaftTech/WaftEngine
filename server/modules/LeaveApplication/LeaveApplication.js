const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RemarkDetail = new Schema({
  Remark: { type: String },
  Date: { type: Date },
  UserID: { type: Schema.Types.ObjectId, ref: 'users' },
  Status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
});

const LeaveApplicationSchema = new Schema({
  Date: { type: Date, default: Date.now, required: true },
  LeaveTypeID: { type: Schema.Types.ObjectId, ref: 'LeaveTypeModel' },
  EmployID: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  From: { type: Date, required: true },
  To: { type: Date, required: true },
  NoOfDays: { type: Number, required: true },
  Added_by: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  Added_at: { type: Date, default: Date.now, required: true },
  IsDeleted: { type: Boolean, required: true, default: false },
  Deleted_By: { type: Schema.Types.ObjectId, ref: 'users' },
  Deleted_At: { Date },

  FromIsHalfDay: { type: Boolean, required: true, default: false },
  ToIsHalfDay: { type: Boolean, required: true, default: false },
  Status: { type: String, required: true, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  Remarks: [RemarkDetail],
});
module.exports = LeaveApplication = mongoose.model('LeaveApplicationModel', LeaveApplicationSchema);
