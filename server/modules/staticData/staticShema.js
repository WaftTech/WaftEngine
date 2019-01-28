const mongoose = require('mongoose');
const schema = mongoose.Schema;
const staticController = {};
const stateSchema = new schema({
  stateID: { type: Number, required: true },
  state_name: { type: String, required: true, unique: true },
  is_active: { type: String, required: true, default: true },
});
const disctrictSchema = new schema({
  disctrictID: { type: Number, required: true },
  district_name: { type: String, required: true, unique: true },
  stateID: { type: Number, required: true },
  is_active: { type: String, required: true, default: true },
});
const vdcMunicipalitySchema = new schema({
  vdc_municipalityID: { type: Number, required: true },
  districtID: { type: Number, required: true },
  name: { type: String, required: true },
  is_active: { type: String, required: true, default: true },
});
staticController.vdcMunicipality = mongoose.model('vdcMunicipality', vdcMunicipalitySchema);
staticController.state = mongoose.model('state', stateSchema);
staticController.disctrict = mongoose.model('disctrict', disctrictSchema);
module.exports = staticController;
