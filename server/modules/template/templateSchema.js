const mongoose = require('mongoose');
const schema = mongoose.Schema;

const templateSchema = new schema({
  template_name: { type: String, required: true },
  template_key: { type: String, required: true, unique: true },
  information: { type: String, required: true },
  variables: [{ type: String, required: true }],
  from: { type: String, required: true },
  subject: { type: String, required: true },
  alternate_text: { type: String, required: true },
  body: { type: String, required: true },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false, required: true },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
});

module.exports = template = mongoose.model('template', templateSchema);
