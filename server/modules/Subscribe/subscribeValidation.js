const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const subscribeConfig = require('./subscribeConfig');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validation.validate = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: subscribeConfig.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: subscribeConfig.validate.isEmail,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
module.exports = validation;
