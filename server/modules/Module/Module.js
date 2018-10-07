const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema(
  {
    module_name: { type: String, required: true },
    module_key: { type: String, require: true },
    is_active: { type: Boolean, require: true },
    section: { type: JSON, require: true },
  },
  { strict: false },
);

module.exports = ModuleSch = mongoose.model('ModuleSch', moduleSchema);
