const mongoose = require('mongoose');
const schema = mongoose.Schema;

const accessSchema = new schema({
  moduleId: { type: Schema.Types.ObjectId, required: true, ref: 'moduleAccess' },
  roleId: { type: Schema.Types.ObjectId, required: true, ref: 'roles' },
  accessType: { type: [Schema.Types.ObjectId], required: true },
  isActive: { type: Boolean, required: true, default: false },
  added_at: { type: Date, default: Date.now },
});

module.exports = Access = mongoose.model('access', accessSchema);
