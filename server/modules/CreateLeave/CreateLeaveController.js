const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const AssignedLeave = require('./../AssignedLeave/AssignedLeave');
const UsersModel = require('./../Users/User');
const LeaveTypeModel = require('./../LeaveType/LeaveType');
const isEmpty = require('../../validation/isEmpty');

const CreateLeaveController = {};
const Internal = {};

CreateLeaveController.getData = async (req, res, next) => {
  let fiscalyear = req.params.fiscalid;
  let data = {};

  try {
    data.Employee = await UsersModel.find({ IsDeleted: false }, 'name gender');
    data.Leave = await LeaveTypeModel.find({ IsDeleted: false }, 'ApplicableGender LeaveName NoOfDays');
    data.AssignedLeave = await AssignedLeave.find({ IsDeleted: false, FiscalYear: fiscalyear }, 'LeaveType EmployeeId NoOfDays');
  } catch (err) {
    next(err);
  }
  return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'CreateLeave data delivered successfully!!!', null);
};

CreateLeaveController.saveData = async (req, res, next) => {
  let returndata = {};
  let fiscalYear = req.body.FiscalYear;

  for (let i = 0; i < req.body.assignedLeave.length; i++) {
    let data = req.body.assignedLeave[i];
    let returneddata = await AssignedLeave.findOne({ LeaveType: data.LeaveType, EmployeeId: data.EmployeeId, FiscalYear: fiscalYear });
    if (data._id) {
      try {
        returndata[i] = await AssignedLeave.findByIdAndUpdate(data._id, { LeaveType: data.LeaveType, EmployeeId: data.EmployeeId, NoOfDays: data.NoOfDays, FiscalYear: fiscalYear, CarryOverLeave: data.CarryOverLeave });
      } catch (err) {
        next(err);
      }
    } else if (returneddata) {
      try {
        returndata[i] = await AssignedLeave.findOneAndUpdate({ LeaveType: data.LeaveType, EmployeeId: data.EmployeeId, FiscalYear: fiscalYear }, { NoOfDays: data.NoOfDays, FiscalYear: fiscalYear, CarryOverLeave: data.CarryOverLeave });
      } catch (err) {
        next(err);
      }
    } else {
      try {
        let fdata = { LeaveType: data.LeaveType, EmployeeId: data.EmployeeId, NoOfDays: data.NoOfDays, FiscalYear: fiscalYear, LeaveTaken: 0, AppliedLeave: 0, LeaveRemaining: data.NoOfDays, CarryOverLeave: data.CarryOverLeave };
        let newdata = new AssignedLeave(fdata);
        returndata[i] = await newdata.save();
      } catch (err) {
        next(err);
      }
    }
  }

  return otherHelper.sendResponse(res, HttpStatus.OK, true, returndata, null, 'Leave added for employee!!!', null);
};

Internal.LeaveRequest = async (LeaveType, FiscalYear, EmployeeId, AppliedLeave) => {
  let status = {};
  let data = await AssignedLeave.findOne({ LeaveType, FiscalYear, EmployeeId }, 'LeaveRemaining');
  //console.log(data);
  if (!isEmpty(data)) {
    let LeaveRemaining = data.LeaveRemaining;
    if (LeaveRemaining < AppliedLeave) {
      status.status = false;
      status.error = { NoOfDays: 'Sorry, you donot have enough leave remaining!!!' };
      return status; //no leave remaining
    } else {
      try {
        await AssignedLeave.findOneAndUpdate({ LeaveType, FiscalYear, EmployeeId }, { $set: { AppliedLeave: AppliedLeave } });
      } catch (err) {
        next(err);
      }
      status.status = true;
      return status; //success
    }
  } else {
    status.status = false;
    status.error = { NoOfDays: 'Sorry, No leave has been assigned for you!!!!' };
    return status; //no leave created
  }
};

module.exports = { CreateLeaveController, Internal };
