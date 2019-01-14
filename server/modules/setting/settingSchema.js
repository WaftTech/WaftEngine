const mongoose = require('mongoose');
const schema = mongoose.Schema;

const settingSchema = new schema({
  title: { type: String, required: true, unique: true },
  value: { type: schema.Types.Mixed },
  email_setting: { type: schema.Types.Mixed },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_date: { type: Date, required: true, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date, default: Date.now },
});

module.exports = Setting = mongoose.model('setting', settingSchema);
