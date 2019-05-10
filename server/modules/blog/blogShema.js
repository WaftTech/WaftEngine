const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { slugify } = require('../../helper/others.helper');

const blogSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
  },
  meta_tag: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  summary: {
    type: String,
  },
  tags: {
    type: [String],
  },
  author: {
    type: String,
  },
  keywords: {
    type: String,
  },
  slug_url: {
    type: String,
  },
  category: {
    type: schema.Types.ObjectId,
    ref: 'category',
  },
  published_on: {
    type: Date,
    default: Date.now,
  },
  is_published: {
    type: Boolean,
    required: true,
    default: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: schema.Types.Mixed,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  deleted_at: {
    type: Date,
    default: Date.now,
  },
  deleted_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  added_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Blog = mongoose.model('blog', blogSchema);
