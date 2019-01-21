const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  slugify
} = require('../../helper/others.helper');

const BlogSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Summary: {
    type: String
  },
  Tags: {
    type: [String]
  },
  Keywords: {
    type: String
  },
  SlugUrl: {
    type: String
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  PublishedOn: {
    type: Date,
    default: Date.now
  },
  IsPublished: {
    type: Boolean,
    required: true,
    default: true
  },
  IsActive: {
    type: Boolean,
    required: true,
    default: false
  },
  Image: {
    type: Schema.Types.Mixed
  },
  IsDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  Deleted_at: {
    type: Date,
    default: Date.now
  },
  Deleted_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  Added_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  Added_at: {
    type: Date,
    default: Date.now
  },
  Updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  Updated_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = Blog = mongoose.model('blog', BlogSchema);