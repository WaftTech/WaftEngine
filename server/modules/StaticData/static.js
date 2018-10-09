const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StateSchema = new Schema({
  StateID: { type: Number, required: true },
  StateName: { type: String, required: true, unique: true },
  IsActive: { type: String, required: true, default: True },
});
const DisctrictSchema = new Schema({
  DisctrictID: { type: Number, required: true },
  DistrictName: { type: String, required: true, unique: true },
  StateID: { type: Number, required: true },
  IsActive: { type: String, required: true, default: True },
});
const VdcMunicipalitySchema = new Schema({
  VdcMunicipalityID: { type: Number, required: true },
  DistrictID: { type: Number, required: true },
  Name: { type: String, required: true, unique: true },
  IsActive: { type: String, required: true, default: True },
});
module.exports = VdcMunicipality = mongoose.model('VdcMunicipality', VdcMunicipalitySchema);
module.exports = State = mongoose.model('State', StateSchema);
module.exports = Disctrict = mongoose.model('Disctrict', DisctrictSchema);
