const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  ModuleName: { type: String, required: true, unique: true },
  Description: { type: String },
  Order: { Type: Number },
  Path: [
    {
      AccessType: { type: String, required: true },
      AccessTypeDescription: { type: String },
      AdminRoutes: [{ type: String, required: true }],
      ServerRoutes: [{ route: { type: String, required: true }, method: { type: String, require: true } }],
    },
  ],
});

module.exports = Access = mongoose.model('moduleAccess', ModuleSchema);
