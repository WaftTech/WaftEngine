const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscribeSchema = new Schema({
  SubscriberId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  UserId: { type: Schema.Types.ObjectId, ref: 'users' },
  CompanyId: { type: Schema.Types.ObjectId, ref: 'company' },
  SubscribedAt: { type: Date, default: Date.now, required: true },
  IsActive: { type: Boolean, required: true, default: true },
});

module.exports = Subscribe = mongoose.model('subscribe', SubscribeSchema);
