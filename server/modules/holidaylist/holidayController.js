const HttpStatus = require('http-status');
const otherHelper = require('./../../helper/others.helper');
const holidaymodel = require('./holiday');
const holidayConfig = require('./holidayConfig');
const holidayController = {};
const Internal = {};

holidayController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    data.addedBy = req.user.id;
    if (data._id) {
      let updated = await holidaymodel.findByIdAndUpdate(data._id, data);
      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, holidayConfig.validationMessage.HolidayUpdate, null);
    } else {
      //checking if date already exists.
      let status = await holidaymodel.findOne({ date: data.date });
      if (status != null) {
        return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, null, holidayConfig.validationMessage.dateAlreadyExists, null);
      } else {
        let newdata = new holidaymodel(data);
        let saved = await newdata.save();
        return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, holidayConfig.validationMessage.SaveData, null);
      }
    }
  } catch (err) {
    next(err);
  }
};

holidayController.getData = async (req, res, next) => {
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

  let populate = { path: 'addedBy', select: '_id name' };

  searchq = { IsDeleted: false };

  if (req.query.find_title) {
    searchq = { title: { $regex: req.query.find_title, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_addedBy) {
    searchq = { addedBy: { $regex: req.query.find_addedBy, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_applicableTo) {
    searchq = { applicableTo: req.query.find_applicableTo, ...searchq };
  }
  if (req.query.find_isHalfDay) {
    searchq = { isHalfDay: req.query.find_isHalfDay, ...searchq };
  }
  if (req.query.find_date) {
    searchq = { date: req.query.find_date, ...searchq };
  }
  selectq = 'title date titleNepali isActive applicableTo isHalfDay addedBy addedDate';

  let datas = await otherHelper.getquerySendResponse(holidaymodel, page, size, sortq, searchq, selectq, next, populate);
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, holidayConfig.validationMessage.GetData, page, size, datas.totaldata);
};

holidayController.getDataByID = async (req, res, next) => {
  try {
    let data = await holidaymodel.findOne({ _id: req.params.id, IsDeleted: false }).select('title date titleNepali isActive applicableTo isHalfDay addedBy addedDate');
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, holidayConfig.validationMessage.GetDataByID, null);
  } catch (err) {
    next(err);
  }
};

holidayController.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await holidaymodel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, holidayConfig.validationMessage.DeleteByID, null);
  } catch (err) {
    next(err);
  }
};

Internal.getHolidayInBetween = async (fromdDate, toDate, employeeID) => {
  let retobj = {};
  let data;

  try {
    //  let employdata = await
    data = await holidaymodel.find({ date: { $gte: fromdDate, $lte: toDate } });
  } catch (err) {
    next(err);
  }
};

module.exports = { holidayController, Internal };
