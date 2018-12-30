const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const { validate, sanitize } = require('../../helper/validate.helper');

const CreateLeaveConfig = require('./CreateLeaveConfig');

const CreateLeavevalidation = {};

CreateLeavevalidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'FiscalYear',
      validate: [
        {
          condition: 'IsEmpty',
          msg: CreateLeaveConfig.ValidateMessage.FiscalYearRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: CreateLeaveConfig.ValidateMessage.FiscalYearInvalid,
        },
      ],
    },
  ]);

  if (!isEmpty(req.body.assignedLeave)) {
    for (let i = 0; i < req.body.assignedLeave.length; i++) {
      let vdata = req.body.assignedLeave[i];
      errors = await validate(vdata, [
        {
          field: 'LeaveType',
          validate: [
            {
              condition: 'IsEmpty',
              msg: CreateLeaveConfig.ValidateMessage.LeaveTypeRequired,
            },
            {
              condition: 'IsMONGOID',
              msg: CreateLeaveConfig.ValidateMessage.LeaveTypeInvalid,
            },
          ],
        },
        {
          field: 'EmployeeId',
          validate: [
            {
              condition: 'IsEmpty',
              msg: CreateLeaveConfig.ValidateMessage.EmployeeIdRequired,
            },
            {
              condition: 'IsMONGOID',
              msg: CreateLeaveConfig.ValidateMessage.EmployeeIdInvalid,
            },
          ],
        },
        {
          field: 'NoOfDays',
          validate: [
            {
              condition: 'IsEmpty',
              msg: CreateLeaveConfig.ValidateMessage.NoOfDaysRequired,
            },
            {
              condition: 'IsNumeric',
              msg: CreateLeaveConfig.ValidateMessage.NoOfDaysInvalid,
            },
          ],
        },
        {
          field: 'CarryOverLeave',
          validate: [
            {
              condition: 'IsEmpty',
              msg: CreateLeaveConfig.ValidateMessage.CarryOverLeaveRequired,
            },
            {
              condition: 'IsNumeric',
              msg: CreateLeaveConfig.ValidateMessage.CarryOverLeaveInvalid,
            },
          ],
        },
      ]);
      if (!isEmpty(errors)) {
        errors.fieldNo = i;
        break;
      }
    }
  } else {
    let er = { LeaveType: 'No Data found!', EmployeeId: 'No Data found!', NoOfDays: 'No Data found!' };
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, er, 'No data Found!!!!', null);
  }

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

CreateLeavevalidation.sanitize = async (req, res, next) => {
  if (!isEmpty(req.body.assignedLeave)) {
    for (let i = 0; i < req.body.assignedLeave.length; i++) {
      let sdata = {};
      sdata.body = req.body.assignedLeave[i];
      await sanitize(sdata, [
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
      ]);
    }
  }

  next();
};

module.exports = CreateLeavevalidation;
