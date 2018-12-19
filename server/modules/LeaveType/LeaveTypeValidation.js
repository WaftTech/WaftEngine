const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');
const LeaveTypeModel = require('./LeaveType');
const LeaveTypeConfig = require('./LeaveTypeConfig');
const validationhelper = require('./../../helper/validate.helper');
const LeaveTypeValidation = {};

LeaveTypeValidation.validate = async (req, res, next) => {
  let errors = await validationhelper.validate(req.body, [
    {
      field: 'LeaveName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveTypeConfig.ValidationMessage.LeaveTypeRequired,
        },
        {
          condition: 'String',
          msg: LeaveTypeConfig.ValidationMessage.LeaveTypeInvalidLength,
          options: {
            min: 5,
            max: 50,
          },
        },
      ],
    },
    {
      field: 'ApplicableGender',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveTypeConfig.ValidationMessage.ApplicableGenderRequired,
        },
        {
          condition: 'Contains',
          msg: LeaveTypeConfig.ValidationMessage.ApplicableGenderInvalid,
          options: ['All', 'Male', 'Female', 'Other'],
        },
      ],
    },
    {
      field: 'NoOfDays',
      validate: [
        {
          condition: 'IsNumeric',
          msg: LeaveTypeConfig.ValidationMessage.NoOfDaysRequired,
        },
        {
          condition: 'IsInt',
          msg: LeaveTypeConfig.ValidationMessage.NoOfDaysRequired,
          options: {
            min: 1,
          },
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

module.exports = LeaveTypeValidation;
