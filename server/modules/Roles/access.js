const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
  ModuleId: { type: Schema.Types.ObjectId, required: true },
  RoleId: { type: Schema.Types.ObjectId, required: true },
  AccessType: { type: [Schema.Types.ObjectId], required: true },
  IsActive: { type: Boolean, required: true, default: false },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Access = mongoose.model('access', AccessSchema);
