const httpStatus = require('http-status');
const settingSch = require('./settingSchema');
const settingConfig = require('./settingConfig');
const otherHelper = require('../../helper/others.helper');
const { findOne } = require('./settingSchema');
const settingController = {};

settingController.GetSettingAll = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);

    if (req.query.find_title) {
      searchQuery = { title: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_value) {
      searchQuery = { value: { $regex: req.query.find_value, $options: 'i' }, ...searchQuery };
    }

    selectQuery = 'key value type sub_type description';

    let setting = await otherHelper.getQuerySendResponse(settingSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, setting.data, settingConfig.get, page, size, setting.totalData);
  } catch (err) {
    next(err);
  }
};

settingController.GetSettingType = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);

    if (req.query.find_title) {
      searchQuery = { key: { $regex: req.query.find_title, $options: 'i' }, ...searchQuery };
    }
    if (req.query.find_value) {
      searchQuery = { value: { $regex: req.query.find_value, $options: 'i' }, ...searchQuery };
    }
    searchQuery = { type: req.params.type, ...searchQuery };

    selectQuery = 'key value type sub_type description';

    let setting = await otherHelper.getQuerySendResponse(settingSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, setting.data, settingConfig.get, page, size, setting.totalData);
  } catch (err) {
    next(err);
  }
};

settingController.GetSettingSingle = async (req, res, next) => {
  try {
    settingId = req.params.setting_id
    selectQuery = 'key value type sub_type description';

    let setting = await settingSch.findOne({ _id: settingId });
    return otherHelper.sendResponse(res, httpStatus.OK, true, setting, null, settingConfig.get, null);
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
      data.type = req.params.type
      data.added_by = req.user.id;
      let newSetting = new settingSch(data);
      let saved = await newSetting.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saved, null, settingConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
settingController.EditSetting = async (req, res, next) => {
  try {
    const data = req.body;
    let allData = [];
    await Promise.all(
      Object.keys(data).map(async each => {
        let edited = await settingSch.findOneAndUpdate({ key: each }, { $set: { value: req.body[each].value, updated_at: Date.now(), updated_by: req.user.id } }, { new: true });
        if (edited) {
          allData.push(edited);
        } else {
          const newSetting = new settingSch({ title: each, key: each, value: req.body[each].value, updated_at: Date.now(), added_by: req.user.id });
          const d = await newSetting.save();
          allData.push(d);
        }
      }),
    );

    if (Object.keys(allData).length) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, allData, null, 'settings edit success!!', null);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = settingController;
