const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  parent_menu: { type: Schema.Types.ObjectId, required: false, ref: 'menu_item' },
  is_internal: {
    type: Boolean,
    required: true,
    default: true,
  },
  url: { type: String, required: true },
  is_active: {
    type: Boolean,
    default: true,
    required: true,
  },
  target: {
    type: String,
    required: true,
    enum: ['_blank', '_self', '_parent', '_top'],
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  updated_at: {
    type: Date,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  added_at: {
    type: Date,
  },
});

const menuSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  order: { type: Number, required: true, default: 1 },

  // parent_menu: { type: Schema.Types.ObjectId, required: false, ref: 'menu_item' },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },

  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  updated_at: {
    type: Date,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  added_at: {
    type: Date,
  },
});
const menusch = mongoose.model('menusch', menuSchema);
const menu_item = mongoose.model('menu_item', menuItemSchema);
module.exports = { menusch, menu_item };
