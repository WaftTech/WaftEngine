const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const { validate, sanitize } = require('./../../helper/validate.helper');

const AssignedLeaveConfig = require('./AssignedLeaveConfig');
const AssignedLeaveModel = require('./AssignedLeave');

const AssignedLeavevalidation = {};

AssignedLeavevalidation.Validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'LeaveType',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.LeaveTypeRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: AssignedLeaveConfig.ValidateMessage.LeaveTypeInvalid,
        },
      ],
    },
    {
      field: 'FiscalYear',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.FiscalYearRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: AssignedLeaveConfig.ValidateMessage.FiscalYearInvalid,
        },
      ],
    },
    {
      field: 'EmployeeId',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.EmployeeIdRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: AssignedLeaveConfig.ValidateMessage.EmployeeIdInvalid,
        },
      ],
    },
    {
      field: 'NoOfDays',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.NoOfDaysRequired,
        },
        {
          condition: 'IsNumeric',
          msg: AssignedLeaveConfig.ValidateMessage.NoOfDaysInvalid,
        },
      ],
    },
    {
      field: 'LeaveTaken',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.LeaveTakenRequired,
        },
        {
          condition: 'IsNumeric',
          msg: AssignedLeaveConfig.ValidateMessage.LeaveTakenInvalid,
        },
      ],
    },
    {
      field: 'CarryOverLeave',
      validate: [
        {
          condition: 'IsEmpty',
          msg: AssignedLeaveConfig.ValidateMessage.CarryOverLeaveRequired,
        },
        {
          condition: 'IsNumeric',
          msg: AssignedLeaveConfig.ValidateMessage.CarryOverLeaveInvalid,
        },
      ],
    },
  ]);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

AssignedLeavevalidation.Sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'NoOfDays',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'CarryOverLeave',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'AppliedLeave',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'LeaveTaken',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

module.exports = AssignedLeavevalidation;
