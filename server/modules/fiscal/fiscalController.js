const HttpStatus = require('http-status');
var OblectId = require('mongoose').Types.ObjectId;
const OtherHelper = require('../../helper/others.helper');
const fiscalConfig = require('./fiscalConfig');
const FiscalSch = require('./fiscal');
const FiscalController = {};
const internal = {};

FiscalController.GetFiscal = async (req, res, next) => {
  const fiscals = await FiscalSch.find({}, { CreatedDate: 0, __v: 0 });
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, fiscals, null, fiscalConfig.getFiscals, null);
};

FiscalController.SaveFiscal = async (req, res, next) => {
  try {
    let fiscals = req.body;
    console.log('fiscals', fiscals);
    if (fiscals && fiscals._id) {
      const update = await FiscalSch.findByIdAndUpdate(fiscals._id, {
        $set: fiscals,
      });
      return OtherHelper.sendResponse(res, HttpStatus.OK, true, update, null, fiscalConfig.saveFiscal, null);
    } else {
      const newFiscals = new FiscalSch(fiscals);
      const FiscalSave = await newFiscals.save();
      return OtherHelper.sendResponse(res, HttpStatus.OK, true, FiscalSave, null, fiscalConfig.saveFiscal, null);
    }
  } catch (err) {
    next(err);
  }
};

FiscalController.GetFiscalById = async (req, res, next) => {
  const id = req.params.id;
  const fiscal = await FiscalSch.findOne({ _id: OblectId(id) }, { CreatedDate: 0, __v: 0 });
  console.log(fiscal);
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, fiscal, null, fiscalConfig.getFiscal, null);
};
module.exports = FiscalController;
