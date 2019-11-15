const httpStatus = require('http-status');
const settingSch = require('./settingSchema');
const isEmpty = require('../../validation/isEmpty');
const settingConfig = require('./settingConfig');
const otherHelper = require('../../helper/others.helper');
const settingController = {};

settingController.GetSetting = async (req, res, next) => {
  try {
    let { page, size, populate, selectq, searchq, sortq } = otherHelper.ParseFilters(req, 10, false);

    if (req.query.find_title) {
      searchq = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchq };
    }
    if (req.query.find_value) {
      searchq = { value: { $regex: req.query.find_value, $options: 'i' }, ...searchq };
    }

    let setting = await otherHelper.getquerySendResponse(settingSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, setting.data, settingConfig.get, page, size, setting.totaldata);
  } catch (err) {
    next(err);
  }
};
settingController.SaveSetting = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id) {
      data.updated_by = req.user.id;
      let updated = await settingSch.findByIdAndUpdate(data._id, { $set: data });
      return otherHelper.sendResponse(res, httpStatus.OK, true, updated, null, settingConfig.save, null);
    } else {
      data.added_by = req.user.id;
      let newsetting = new settings(data);
      let saved = await newsetting.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, settingConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = settingController;
