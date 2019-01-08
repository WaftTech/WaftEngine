const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
  ModuleId: { type: Schema.Types.ObjectId, required: true, ref: 'moduleAccess' },
  RoleId: { type: Schema.Types.ObjectId, required: true, ref: 'roles' },
  AccessType: { type: [Schema.Types.ObjectId], required: true },
  IsActive: { type: Boolean, required: true, default: true },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Access = mongoose.model('access', AccessSchema);
