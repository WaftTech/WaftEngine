const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolesSchema = new schema({
  role_title: { type: String, required: true },
  description: { type: String, required: false },
  is_active: { type: Boolean, required: true, default: true },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = Roles = mongoose.model('roles', rolesSchema);
