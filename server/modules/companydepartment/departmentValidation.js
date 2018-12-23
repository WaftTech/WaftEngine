const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const departmentConfig = require('./departmentConfig');

// validation helper
const { validate, sanitize } = require('./../../helper/validate.helper');

const departmentValidation = {};

departmentValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'departmentName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: departmentConfig.validationMessage.departmentNameRequired,
        },
      ],
    },
    {
      field: 'numberofStaff',
      validate: [
        {
          condition: 'IsEmpty',
          msg: departmentConfig.validationMessage.numberRequired,
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

departmentValidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'departmentName',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'departmentNameNepali',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

module.exports = departmentValidation;
