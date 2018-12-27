const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const AssignedLeave = require('./../AssignedLeave/AssignedLeave');
const UsersModel = require('./../Users/User');
const LeaveTypeModel = require('./../LeaveType/LeaveType');

const CreateLeaveController = {};

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
    if (data._id) {
      try {
        returndata[i] = await AssignedLeave.findByIdAndUpdate(data._id, { LeaveType: data.LeaveType, EmployeeId: data.EmployeeId, NoOfDays: data.NoOfDays, FiscalYear: fiscalYear, CarryOverLeave: data.CarryOverLeave });
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

module.exports = CreateLeaveController;
