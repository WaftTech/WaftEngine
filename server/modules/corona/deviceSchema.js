const mongoose = require('mongoose');
const schema = mongoose.Schema;

const deviceSchema = new schema({
  device: { type: schema.Types.Mixed, required: true },
  location: { type: schema.Types.Mixed, required: true },
  android_token: { type: String },
  ios_token: { type: String },
  added_at: { type: Date, default: Date.now },
});

module.exports = Device = mongoose.model('device', deviceSchema);
