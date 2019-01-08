const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');
const LeaveApplicationModel = require('./LeaveApplication');
const LeaveApplicationConfig = require('./LeaveApplicationConfig');
const validationhelper = require('./../../helper/validate.helper');
const LeaveApplicationValidation = {};

LeaveApplicationValidation.validate = async (req, res, next) => {
  let errors = await validationhelper.validate(req.body, [
    // {
    //   field: 'Remarks.Status',
    //   validate: [
    //     {
    //       condition: 'contains',
    //       msg: LeaveApplicationConfig.ValidationMessage.StatusRequired,
    //       options: ['', 'Pending', 'Accepted', 'Rejected'],
    //     },
    //   ],
    // },

    // {
    //   field: 'Remarks.Remark',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: LeaveApplicationConfig.ValidationMessage.RemarkRequired,
    //     },
    //   ],
    // },

    // {
    //   field: 'Remarks.Date',
    //   validate: [
    //     {
    //       condition: 'IsDate',
    //       msg: LeaveApplicationConfig.ValidationMessage.DateRequired,
    //     },
    //   ],
    // },
    {
      field: 'To',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.ToRequired,
        },
        {
          condition: 'IsDate',
          msg: LeaveApplicationConfig.ValidationMessage.ToInvalid,
        },
      ],
    },
    {
      field: 'From',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.FromRequired,
        },
        {
          condition: 'IsDate',
          msg: LeaveApplicationConfig.ValidationMessage.FromInvalid,
        },
      ],
    },
    {
      field: 'NoOfDays',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.NoOfDaysRequired,
        },
        {
          condition: 'IsNumeric',
          msg: LeaveApplicationConfig.ValidationMessage.NoOfDaysInvalid,
        },
        {
          condition: 'IsFloat',
          msg: LeaveApplicationConfig.ValidationMessage.NoOfDaysInvalid,
          options: {
            gt: 0,
          },
        },
      ],
    },
    {
      field: 'EmployID',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: LeaveApplicationConfig.ValidationMessage.EmployIDInvalid,
        },
      ],
    },
    {
      field: 'LeaveTypeID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.LeaveTypeIDRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: LeaveApplicationConfig.ValidationMessage.LeaveTypeIDInvalid,
        },
      ],
    },
  ]);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error', null);
  } else {
    next();
  }
};

LeaveApplicationValidation.validateRemarks = async (req, res, next) => {
  let vdata = req.body.Remarks;
  let fvdata = {};
  let errors = {};
  console.log(vdata);
  if (!isEmpty(vdata)) {
    for (let i = 0; i < vdata.length; i++) {
      fvdata = vdata[i];
      errors = await validationhelper.validate(fvdata, [
        {
          field: 'Status',
          validate: [
            {
              condition: 'contains',
              msg: LeaveApplicationConfig.ValidationMessage.StatusRequired,
              options: ['', 'Pending', 'Accepted', 'Rejected'],
            },
          ],
        },

        {
          field: 'Remark',
          validate: [
            {
              condition: 'IsEmpty',
              msg: LeaveApplicationConfig.ValidationMessage.RemarkRequired,
            },
          ],
        },

        {
          field: 'Date',
          validate: [
            {
              condition: 'IsDate',
              msg: LeaveApplicationConfig.ValidationMessage.DateRequired,
            },
          ],
        },
      ]);

      if (!isEmpty(errors)) {
        break;
      }
    }
  } else {
    errors = { Remarks: userConfig.validationMessage.RemarkRequired };
  }
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    next();
  }
};

LeaveApplicationValidation.validateNoOfDays = async (req, res, next) => {
  let errors = await validationhelper.validate(req.body, [
    {
      field: 'EmployeeID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.EmployIDRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: LeaveApplicationConfig.ValidationMessage.EmployIDInvalid,
        },
      ],
    },
    {
      field: 'LeaveType',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.LeaveTypeIDRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: LeaveApplicationConfig.ValidationMessage.LeaveTypeIDInvalid,
        },
      ],
    },
    {
      field: 'ToDate',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.ToRequired,
        },
        {
          condition: 'IsDate',
          msg: LeaveApplicationConfig.ValidationMessage.ToInvalid,
        },
      ],
    },
    {
      field: 'FromDate',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.FromRequired,
        },
        {
          condition: 'IsDate',
          msg: LeaveApplicationConfig.ValidationMessage.FromInvalid,
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error', null);
  } else {
    next();
  }
};

module.exports = LeaveApplicationValidation;
