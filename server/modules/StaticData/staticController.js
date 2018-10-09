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
  if (StateID != 0) {
    const static = await Disctrict.find({ StateID: StateID });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Distrct of Sate Get Success !!', null);
  } else {
    const static = await Disctrict.find();
    return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Distrct of Sate Get Success !!', null);
  }
};
staticController.GetVdcMunicipality = async (req, res, next) => {
  const DistrictID = req.params.DistrictID;

  if (DistrictID != 0) {
    const static = await VdcMunicipality.find({ DistrictID: DistrictID });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Vdc/Municipality of Disctrict Get Success !!', null);
  } else {
    const static = await VdcMunicipality.find();
    return otherHelper.sendResponse(res, HttpStatus.OK, true, static, null, 'Vdc/Municipality of Disctrict Get Success !!', null);
  }
};

module.exports = staticController;
