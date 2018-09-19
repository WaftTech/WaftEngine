const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({}, { strict: false });

module.exports = ModuleSch = mongoose.model('ModuleSch', moduleSchema);