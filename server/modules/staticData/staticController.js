const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const { vdcMunicipality, disctrict, state } = require('./staticShema');
const staticController = {};
const internal = {};

staticController.GetStates = async (req, res, next) => {
  const static = await state.find();
  return otherHelper.sendResponse(res, httpStatus.OK, true, static, null, 'State Get Success !!', null);
};
staticController.GetDisctrict = async (req, res, next) => {
  const stateId = req.params.stateId;
  if (stateId != 0) {
    const static = await disctrict.find({ stateId: stateId });
    return otherHelper.sendResponse(res, httpStatus.OK, true, static, null, 'District of Sate Get Success !!', null);
  } else {
    const static = await disctrict.find();
    return otherHelper.sendResponse(res, httpStatus.OK, true, static, null, 'District of Sate Get Success !!', null);
  }
};
staticController.GetVdcMunicipality = async (req, res, next) => {
  const districtId = req.params.districtId;

  if (districtId != 0) {
    const static = await vdcMunicipality.find({ districtId: districtId });
    return otherHelper.sendResponse(res, httpStatus.OK, true, static, null, 'Vdc/Municipality of Disctrict Get Success !!', null);
  } else {
    const static = await vdcMunicipality.find();
    return otherHelper.sendResponse(res, httpStatus.OK, true, static, null, 'Vdc/Municipality of Disctrict Get Success !!', null);
  }
};

module.exports = staticController;
