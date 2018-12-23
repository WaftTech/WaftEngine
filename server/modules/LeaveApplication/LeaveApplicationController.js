const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const LeaveApplicationModel = require('./LeaveApplication');
const LeaveApplicationController = {};

LeaveApplicationController.GetLeaveApplication = async (req, res, next) => {
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
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);
    if (sortby == 1 && !isNaN(sortby)) {
      //1 is for asscending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for Descending
      sortquery = '-' + sortfield;
    } else {
      sortquery = '';
    }
  }
  searchquery = { IsDeleted: false };
  if (req.query.find_IsHalfDay) {
    if (req.query.find_IsHalfDay == 0) {
      //0 for true
      searchquery = { IsHalfDay: true, ...searchquery };
    } else {
      searchquery = { IsHalfDay: false, ...searchquery };
    }
  }
  if (req.query.find_NoOfDays) {
    searchquery = { NoOfDays: req.query.find_NoOfDays, ...searchquery };
  }
  if (req.query.find_SubmittedTo) {
    searchquery = { SubmittedTo: { $regex: req.query.find_SubmittedTo, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_SubmittedBy) {
    searchquery = { SubmittedBy: { $regex: req.query.find_SubmittedBy, $options: 'i x' }, ...searchquery };
  }
  if (req.query.find_Added_by) {
    searchquery = { Added_by: { $regex: req.query.find_Added_by, $options: 'i x' }, ...searchquery };
  }

  selectquery = 'IsHalfDay NoOfDays SubmittedTo SubmittedBy Added_by';

  let datas = await otherHelper.getquerySendResponse(LeaveApplicationModel, page, size, sortquery, searchquery, selectquery, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Leave Application Data Delivered Successfully', page, size, datas.totaldata);
};

LeaveApplicationController.GetLeaveApplicationByID = async (req, res, next) => {
  try {
    let data = await LeaveApplicationModel.findOne({ _id: req.params.id, IsDeleted: false }).select('IsHalfDay NoOfDays SubmittedTo SubmittedBy Added_by To From');
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Leave Application data delivered successfully', null);
  } catch (err) {
    next(err);
  }
};

LeaveApplicationController.AddLeaveApplication = async (req, res, next) => {
  try {
    let LeaveApplication = req.body;
    if (LeaveApplication._id) {
      let update = await LeaveApplicationModel.findByIdAndUpdate(LeaveApplication._id, { $set: LeaveApplication });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Leave Application Saved Success !!', null);
    } else {
      // LeaveType.Added_by = req.user.id;
      let newLeaveApplication = new LeaveApplicationModel(LeaveApplication);
      await newLeaveApplication.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newLeaveApplication, null, 'Leave Application Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
LeaveApplicationController.DeleteByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await LeaveApplicationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_By: req.user.id, Deleted_At: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Leave Application Data delete Success', null);
  } catch (err) {
    next(err);
  }
};

module.exports = LeaveApplicationController;
