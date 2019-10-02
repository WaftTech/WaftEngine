const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
  title: { type: String, required: true },
  blog_id: { type: schema.Types.ObjectId, ref: 'blog' },
  is_approved: { type: Boolean, default: false },
  is_disapproved: { type: Boolean, default: false },
  approved_by: { type: schema.Types.ObjectId, ref: 'users' },
  disapproved_by: { type: schema.Types.ObjectId, ref: 'users' },
  status: { type: String, enum: ['posted', 'onhold', 'approved', 'disapproved'], default: 'onhold' },
  approved_at: { type: Date },
  disapproved_at: { type: Date },
  added_at: { type: Date, default: Date.now() },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});

module.exports = Comments = mongoose.model('comment', commentSchema);
