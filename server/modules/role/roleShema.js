const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolesSchema = new schema({
  rolesTitle: { type: String, required: true },
  description: { type: String, required: false },
  isActive: { type: Boolean, required: true, default: true },
  added_at: { type: Date, default: Date.now },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = Roles = mongoose.model('roles', rolesSchema);
