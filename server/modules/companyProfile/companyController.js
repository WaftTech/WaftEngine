const HttpStatus = require('http-status');
const otherHelper = require('./../../helper/others.helper');
const companyModel = require('./company');
const companyConfig = require('./companyConfig');
const companyController = {};

companyController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    data.addedBy = req.user.id;
    if (data._id) {
      let updated = await companyModel.findByIdAndUpdate(data._id, data);
      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, companyConfig.validationMessage.SaveData, null);
    } else {
      //checking if any company already exists.
      let status = await companyModel.findOne();
      if (status != null) {
        return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, null, companyConfig.validationMessage.YouCant, null);
      } else {
        let newdata = new companyModel(data);
        let saved = await newdata.save();
        return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, companyConfig.validationMessage.Added, null);
      }
    }
  } catch (err) {
    next(err);
  }
};

companyController.getData = async (req, res, next) => {
  let data = await companyModel.findOne();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, companyConfig.validationMessage.GetData, null);
};

module.exports = companyController;
