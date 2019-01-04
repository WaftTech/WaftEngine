const HttpStatus = require('http-status');
const otherHelper = require('./../../helper/others.helper');
const isEmpty = require('../../validation/isEmpty');
const settings = require('./settings');
const settingsController = {};
const Internal = {};

settingsController.getData = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  let searchq;
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

  let populate = [{ path: 'addedBy', select: '_id name' }, { path: 'updatedBy', select: '_id name' }];

  searchq = {};

  if (req.query.find_key) {
    searchq = { key: { $regex: req.query.find_key, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_value) {
    searchq = { value: { $regex: req.query.find_value, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_isUpdated) {
    searchq = { isUpdated: req.query.find_isUpdated, ...searchq };
  }

  selectq = '';

  let datas = await otherHelper.getquerySendResponse(settings, page, size, sortq, searchq, selectq, next, populate);
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Settings data delivered successfully!!', page, size, datas.totaldata);
};

settingsController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id) {
      data.updatedBy = req.user.id;
      data.updatedAt = Date.now;
      let updated = await settings.findByIdAndUpdate(data._id, data);
      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, 'Settings updated!!!', null);
    } else {
      data.addedBy = req.user.id;
      let newdata = new settings(data);
      let saved = await newdata.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, 'Settings successfully added!!', null);
    }
  } catch (err) {
    next(err);
  }
};

settingsController.getDataByKey = async (req, res, next) => {
  const key = req.params.key;
  let data;
  try {
    data = await settings.findOne({ key });
  } catch (err) {
    next(err);
  }
  if (isEmpty(data)) {
    return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, null, `No key found with value '${key}' !!!`, null);
  } else {
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Settings successfully delivered!!', null);
  }
};

Internal.getDataByKey = async key => {
  let data;
  try {
    data = await settings.findOne({ key });
  } catch (err) {
    next(err);
  }
  if (isEmpty(data)) {
    return null;
  } else {
    return data.value;
  }
};

module.exports = { settingsController, Internal };
