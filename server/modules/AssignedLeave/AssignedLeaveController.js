const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const AssignedLeave = require('./AssignedLeave');

const FiscalYearInternal = require('./../fiscal/fiscalController').Internal;

const AssignedLeaveController = {};

AssignedLeaveController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    if (data._id) {
      let updated = await AssignedLeave.findByIdAndUpdate(data._id, data);

      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, 'AssignedLeave updated!!!', null);
    } else {
      let newdata = new AssignedLeave(data);
      let saved = await newdata.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, 'New Assigned Leave successfully added!!', null);
    }
  } catch (err) {
    next(err);
  }
};

AssignedLeaveController.getData = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  let searchq;
  let sortq;
  let selectq;
  let populate;

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
  searchq = { IsDeleted: false };

  if (req.query.find_EmployeeId) {
    searchq = {
      EmployeeId: req.query.find_EmployeeId,
      ...searchq,
    };
  }

  selectq = 'LeaveType FiscalYear EmployeeId NoOfDays LeaveTaken LeaveRemaining AppliedLeave CarryOverLeave';

  populate = [{ path: 'LeaveType', select: '_id LeaveName LeaveNameNepali' }, { path: 'FiscalYear', select: '_id FiscalYear FiscalYearNepali' }, { path: 'EmployeeId', select: '_id name nameNepali' }];

  let datas = await otherHelper.getquerySendResponse(AssignedLeave, page, size, sortq, searchq, selectq, next, populate);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Assigned Leave delivered successfully!!', page, size, datas.totaldata);
};

AssignedLeaveController.getDataByID = async (req, res, next) => {
  try {
    let data = await AssignedLeave.findOne({ _id: req.params.id, IsDeleted: false })
      .select('LeaveType FiscalYear EmployeeId NoOfDays LeaveTaken LeaveRemaining AppliedLeave CarryOverLeave')
      .populate([{ path: 'LeaveType', select: '_id LeaveName LeaveNameNepali' }, { path: 'FiscalYear', select: '_id FiscalYear FiscalYearNepali' }, { path: 'EmployeeId', select: '_id name nameNepali' }]);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Assigned Leave delivered successfully!!', null);
  } catch (err) {
    next(err);
  }
};

AssignedLeaveController.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await AssignedLeave.findByIdAndUpdate(id, {
      $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() },
    });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Assigned Leave delete Success !!', null);
  } catch (err) {
    next(err);
  }
};

AssignedLeaveController.getLeaveListOfEmployee = async (req, res, next) => {
  let empID = req.params.empid;
  let data;
  let Fiscal = await FiscalYearInternal.FindFiscalYear(new Date().toISOString());
  try {
    data = await AssignedLeave.find({ EmployeeId: empID, FiscalYear: Fiscal }, 'NoOfDays LeaveRemaining EmployeeId LeaveType').populate({ path: 'LeaveType', select: 'LeaveName' });
  } catch (errr) {
    next(err);
  }
  return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Leave List deliver Success !!', null);
};

module.exports = AssignedLeaveController;
