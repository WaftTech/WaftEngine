const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleGroupSchema = new schema({
  module_group: { type: String, required: true, unique: true },
  description: { type: String },
  module_group_main: { type: schema.Types.ObjectId, path: 'moduleGroup' },
  order: { type: Number },
});

module.exports = moduleGroup = mongoose.model('moduleGroup', moduleGroupSchema);
