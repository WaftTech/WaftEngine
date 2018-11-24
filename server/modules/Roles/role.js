const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
  RolesTitle: { type: String, required: true },
  Description: { type: String, required: false },
  IsActive: { type: Boolean, required: true, default: true },
  Added_at: { type: Date, default: Date.now },
  Added_by: { type: Schema.Types.ObjectId },
});

module.exports = Roles = mongoose.model('roles', RolesSchema);
