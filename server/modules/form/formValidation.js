const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const formConfig = require('./formConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'full_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'mobile',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validation = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'full_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: formConfig.validate.nameLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],
    
    },
    
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = validations;
