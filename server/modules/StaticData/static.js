const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const staticController = {};
const StateSchema = new Schema({
  StateID: { type: Number, required: true },
  StateName: { type: String, required: true, unique: true },
  IsActive: { type: String, required: true, default: true },
});
const DisctrictSchema = new Schema({
  DisctrictID: { type: Number, required: true },
  DistrictName: { type: String, required: true, unique: true },
  StateID: { type: Number, required: true },
  IsActive: { type: String, required: true, default: true },
});
const VdcMunicipalitySchema = new Schema({
  VdcMunicipalityID: { type: Number, required: true },
  DistrictID: { type: Number, required: true },
  Name: { type: String, required: true },
  IsActive: { type: String, required: true, default: true },
});
staticController.VdcMunicipality = mongoose.model('VdcMunicipality', VdcMunicipalitySchema);
staticController.State = mongoose.model('State', StateSchema);
staticController.Disctrict = mongoose.model('Disctrict', DisctrictSchema);
module.exports = staticController;
