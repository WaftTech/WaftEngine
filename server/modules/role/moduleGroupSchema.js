const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleGroupSchema = new schema({
  module_group: { type: String, required: true, unique: true },
  description: { type: String },
  module_group_main: { type: schema.Types.ObjectId, path: 'moduleGroupAccess' },
  order: { type: Number },
});

module.exports = Access = mongoose.model('moduleGroupAccess', moduleGroupSchema);
