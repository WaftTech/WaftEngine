const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: { type: String, required: true },
  added_at: { type: Date, default: Date.now },
  isSubscribed: { type: Boolean, default: true },
});
module.exports = Subscribe = mongoose.model('subscribe', subscribeSchema);
