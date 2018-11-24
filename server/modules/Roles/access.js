const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AccessSchema = new Schema({
  Modules: { type: String, required: true },
  IsActive: { type: Boolean, required: true, default: false },
  AccessImage: { type: String, required: true },
  Added_at: { type: Date, default: Date.now },
});

module.exports = Access = mongoose.model('access', AccessSchema);
