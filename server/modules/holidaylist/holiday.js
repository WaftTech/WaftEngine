const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holidaySchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  applicableTo: { type: String, required: true, enum: ['All', 'Male', 'Female', 'Other'] },
  isHalfDay: { type: Boolean, required: true, default: false },
  addedBy: { type: Schema.Types.ObjectId, requires: true, ref: 'users' },
  addedDate: { type: Date, required: true, default: Date.now },
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

module.exports = holidaylist = mongoose.model('holidaylist', holidaySchema);
