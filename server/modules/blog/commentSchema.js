const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogCommentSchema = new schema({
  title: { type: String, required: true },
  blog_id: { type: schema.Types.ObjectId, ref: 'blog' },
  added_at: { type: Date, default: Date.now() },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});

module.exports = BlogComment = mongoose.model('blogComment', blogCommentSchema);
