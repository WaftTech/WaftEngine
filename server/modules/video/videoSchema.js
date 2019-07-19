const mongoose = require('mongoose');
const schema = mongoose.Schema;

const videoSchema = new schema({
  video_library: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  videos: [
    {
      title: { type: String },
      url: { type: String },
    },
  ],
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, required: true, default: false },
});

module.exports = Video = mongoose.model('video', videoSchema);
