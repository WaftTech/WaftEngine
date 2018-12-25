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
    {
      field: 'NoOfDays',
      validate: [
        {
          condition: 'IsNumeric',
          msg: LeaveApplicationConfig.ValidationMessage.NoOfDaysRequired,
        },
        {
          condition: 'IsInt',
          msg: LeaveApplicationConfig.ValidationMessage.NoOfDaysInvalid,
          options: {
            min: 1,
          },
        },
      ],
    },

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
      field: 'Remarks',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.RemarksRequired,
        },
      ],
    },
    {
      field: 'SubmittedTo',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.SubmittedToRequired,
        },
        {
          condition: 'String',
          msg: LeaveApplicationConfig.ValidationMessage.SubmittedToInvalid,
        },
      ],
    },
    {
      field: 'SubmittedBy',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.SubmittedByRequired,
        },
        {
          condition: 'String',
          msg: LeaveApplicationConfig.ValidationMessage.SubmittedByInvalid,
        },
      ],
    },
    {
      field: 'Added_by',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.Added_byRequired,
        },
        {
          condition: 'String',
          msg: LeaveApplicationConfig.ValidationMessage.Added_byInvalid,
        },
      ],
    },
    {
      field: 'To',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveApplicationConfig.ValidationMessage.ToRequired,
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
