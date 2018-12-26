const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  Module: { type: String, required: true, enum: ['Leave'] },
  Description: { type: String, required: true },
  IsSeen: { type: Boolean, required: true, default: false },
  AddedAt: { type: Date, required: true, default: Date.now },
  IsRead: { type: Boolean, required: true, default: false },
});
module.exports = Notifications = mongoose.model('Notifications', NotificationSchema);
