const mongoose = require('mongoose');
const schema = mongoose.Schema;
const staticController = {};
const stateSchema = new schema({
  stateID: { type: Number, required: true },
  stateName: { type: String, required: true, unique: true },
  isActive: { type: String, required: true, default: true },
});
const disctrictSchema = new schema({
  disctrictID: { type: Number, required: true },
  districtName: { type: String, required: true, unique: true },
  stateID: { type: Number, required: true },
  isActive: { type: String, required: true, default: true },
});
const vdcMunicipalitySchema = new schema({
  vdcMunicipalityID: { type: Number, required: true },
  districtID: { type: Number, required: true },
  name: { type: String, required: true },
  isActive: { type: String, required: true, default: true },
});
staticController.vdcMunicipality = mongoose.model('vdcMunicipality', vdcMunicipalitySchema);
staticController.state = mongoose.model('state', stateSchema);
staticController.disctrict = mongoose.model('disctrict', disctrictSchema);
module.exports = staticController;
