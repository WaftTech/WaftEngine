const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  ModuleName: { type: String, required: true, unique: true },
  Path: [
    {
      AccessType: { type: String, required: true, enum: ['VIEW', 'VIEWALL', 'VIEWDETAIL', 'UPDATE', 'DELETE', , 'ADD'] },
      AdminRoutes: [{ type: String, required: true }],
      ServerRoutes: [{ route: { type: String, required: true }, method: { type: String, require: true } }],
    },
  ],
});

module.exports = Access = mongoose.model('moduleAccess', ModuleSchema);
