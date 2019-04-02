const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subscribeSchema = new schema({
  email: { type: String, required: true },
  is_subscribed: { type: Boolean, default: false },
  added_at: { type: Date, default: Date.now },
});

module.exports = Subscribe = mongoose.model('subscribe', subscribeSchema);
