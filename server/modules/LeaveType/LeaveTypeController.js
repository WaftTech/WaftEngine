const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const LeaveTypeModel = require('./LeaveType');
const LeaveTypeController = {};

LeaveTypeController.GetLeaveType = async (req, res, next) => {
  let page;
  const size_default = 10;
  let size;
  let searchquery;
  let sortquery;
  let selectquery;
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.page && !NaN(req.query.page) && req.query.page != 0) {
    size = Math.abs(req.query.page);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);

    if (sortby == 1 && !isNaN(sortby)) {
      // 1 is for ascending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for descending
      sortquery = '-' + sortfield;
    } else {
      sortquery = '';
    }
  }

  searchquery = {};
  if (req.query.find_LeaveName) {
    searchquery = { LeaveName: { $regex: req.query.find_LeaveName, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_IsTranferrable) {
    searchquery = { IsTranferrable: { $regex: req.query.find_IsTranferrable, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_IsPaidLeave) {
    searchquery = { IsPaidLeave: { $regex: req.query.find_IsPaidLeave, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_ApplicableGender) {
    searchquery = { ApplicableGender: { $regex: req.query.find_ApplicableGender, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_NoOfDays) {
    searchquery = { NoOfDays: { $regex: req.query.find_NoOfDays, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_IsReplacementLeave) {
    searchquery = { IsReplacementLeave: { $regex: req.query.find_IsReplacementLeave, $options: 'i x' }, ...searchquery };
  }

  selectquery = 'LeaveName IsTransferrable IsPaidLeave ApplicableGender NoOfDays';

  let datas = await otherHelper.getquerySendResponse(LeaveTypeModel, page, size, sortquery, searchquery, selectquery, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Leave Type Data delivered successfully', page, size, datas.totaldata);
};

LeaveTypeController.GetLeaveTypeByID = async (req, res, next) => {
  try {
    let data = await LeaveTypeModel.find({ _id: req.params.id }).select('LeaveName IsTransferrable IsActive IsPaidLeave ApplicableGender NoOfDays IsReplacementLeave Added_By');
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Leave Type data delivered successfully', null);
  } catch (err) {
    next(err);
  }
};

LeaveTypeController.AddLeaveType = async (req, res, next) => {
  try {
    let LeaveType = req.body;
    if (LeaveType._id) {
      let update = await LeaveTypeModel.findByIdAndUpdate(LeaveType._id, { $set: LeaveType });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Leave Type Saved Success !!', null);
    } else {
      // LeaveType.Added_by = req.user.id;
      let newLeaveType = new LeaveTypeModel(LeaveType);
      await newLeaveType.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newLeaveType, null, 'Leave Type Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};

LeaveTypeController.DeleteByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await LeaveTypeModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_By: req.user.id, Deleted_At: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Leave Type Data delete Success', null);
  } catch (err) {
    next(err);
  }
};

module.exports = LeaveTypeController;
