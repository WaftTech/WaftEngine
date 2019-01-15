const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    title: { type: String, required: true},
    slug_url: { type: String },
    added_by: { type: schema.Types.ObjectId, ref: 'users'},
    added_at: { type: Date, default: Date.now}
});
module.exports = Category = mongoose.model('category', categorySchema);