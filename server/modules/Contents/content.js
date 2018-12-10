const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
  ContentName: { type: String, required: true },
  Description: { type: String, required: false },
  PublishFrom: { type: Date, required: false },
  PublishTo: { type: Date, required: false },
  IsActive: { type: Boolean, required: true, default: false },
  IsFeature: { type: Boolean, required: true, default: false },
  ContentImage: { type: String, required: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Content = mongoose.model('content', ContentSchema);
