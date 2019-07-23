const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
  title: {
    type: String,
    required: true,
  },
  slug_url: {
    type: String,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
  },
  added_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Category = mongoose.model('category', categorySchema);
