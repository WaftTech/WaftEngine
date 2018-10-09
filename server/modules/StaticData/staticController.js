const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const { VdcMunicipality, Disctrict, State } = require('./static');
const staticController = {};
const internal = {};

staticController.GetStates = async (req, res, next) => {
  const static = await State.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'State Get Success !!', null);
};
staticController.GetDisctrict = async (req, res, next) => {
  const StateID = req.params.StateID;
  const static = await CatSch.find({ StateID: StateID });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Distrct of Sate Get Success !!', null);
};
staticController.GetVdcMunicipality = async (req, res, next) => {
  const DistrictID = req.params.DistrictID;
  const static = await CatSch.find({ DistrictID: DistrictID });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Distrct of Sate Get Success !!', null);
};

module.exports = staticController;
