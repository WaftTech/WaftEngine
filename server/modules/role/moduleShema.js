const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleSchema = new schema({
  module_name: { type: String, required: true, unique: true },
  description: { type: String },
  order: { Type: Number },
  path: [
    {
      accessType: { type: String, required: true },
      accessTypeDescription: { type: String },
      adminRoutes: [{ type: String, required: true }],
      serverRoutes: [{ route: { type: String, required: true }, method: { type: String, require: true } }],
    },
  ],
});

module.exports = Access = mongoose.model('moduleAccess', moduleSchema);
