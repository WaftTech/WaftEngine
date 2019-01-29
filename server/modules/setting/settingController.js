const httpStatus = require('http-status');
const settingSch = require('./settingSchema');
const isEmpty = require('../../validation/isEmpty');
const settingConfig = require('./settingConfig');
const otherHelper = require('../../helper/others.helper');
const settingController = {};

settingController.GetSetting = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchq;
    let populate;
    let sortq;
    let selectq;

    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      console.log(sortfield);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortq = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortq = '-' + sortfield;
      } else {
        sortq = '';
      }
    }

    populate = '';

    searchq = {};

    if (req.query.find_title) {
      searchq = { title: { $regex: req.query.find_title, $options: 'i x' }, ...searchq };
    }
    if (req.query.find_value) {
      searchq = { value: { $regex: req.query.find_value, $options: 'i x' }, ...searchq };
    }

    selectq = 'title value email_setting added_by updated_by updated_at';

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
