const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const coronaSch = require('./coronaSchema');
const deviceSch = require('./deviceSchema');
const coronaConfig = require('./coronaConfig');
const coronaController = {};
const internal = {};

coronaController.saveDevice = async (req, res, next) => {
  try {
    let { device, android_token, ios_token, location } = req.body;
    let device_id = '';
    let response = { country: coronaConfig.country, district: coronaConfig.district };
    const ifAlready = await deviceSch.find({ android_token: android_token, ios_token: ios_token }).lean();
    if (ifAlready) {
      device_id = ifAlready._id;
    } else {
      const newDevice = new deviceSch({ device, android_token, ios_token, location });
      const deviceInfo = await newDevice.save();
      device_id = deviceInfo._id;
    }
    response.device_id = device_id;
    return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, coronaConfig.save, null);
  } catch (err) {
    next(err);
  }
};

coronaController.GetCorona = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_name) {
      searchQuery = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_key) {
      searchQuery = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_from) {
      searchQuery = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_publish_to) {
      searchQuery = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_is_page) {
      searchQuery = { ...searchQuery, is_page: req.query.find_is_page };
    }
    let datas = await otherHelper.getquerySendResponse(coronaSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, coronaConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
coronaController.SaveCorona = async (req, res, next) => {
  try {
    const coronas = req.body;
    if (coronas && coronas._id) {
      const update = await coronaSch.findByIdAndUpdate(coronas._id, { $set: coronas }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, coronaConfig.save, null);
    } else {
      coronas.added_by = req.user.id;
      const newCorona = new coronaSch(coronas);
      const coronasSave = await newCorona.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, coronasSave, null, coronaConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
coronaController.GetCoronaDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coronas = await coronaSch.findOne({ _id: id, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, coronas, null, coronaConfig.get, null);
  } catch (err) {
    next(err);
  }
};
coronaController.GetCoronaByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const coronas = await coronaSch.findOne({ key, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, coronas, null, coronaConfig.get, null);
  } catch (err) {
    next(err);
  }
};
coronaController.DeleteCorona = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await coronaSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'corona delete success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = coronaController;
