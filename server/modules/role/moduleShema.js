const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moduleSchema = new schema({
  module_name: { type: String, required: true },
  description: { type: String },
  order: { Type: Number },
  path: [
    {
      access_type: { type: String, required: true },
      access_type_description: { type: String },
      admin_routes: [{ type: String, required: true }],
      server_routes: [
        {
          route: { type: String, required: true },
          method: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = Access = mongoose.model('moduleAccess', moduleSchema);
