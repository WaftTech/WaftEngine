const validator = require('validator');
const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const blogConfig = require('./blogConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
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
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: blogConfig.validate.titleLength,
          options: { min: 3, max: 100 },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: blogConfig.validate.descriptionLength,
          options: { min: 5, max: 2000 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.OK, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};
validation.catSanitize = (req, res, next) => {
  otherHelper.sanitize(req, [{
    field: 'title',
    sanitize: {
      trim: true,
    }
  }]);
  next();
};
validation.catValidate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: blogConfig.validate.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.OK, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};
module.exports = validation;
