const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const testimonialConfig = require('./testimonialConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: testimonialConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: testimonialConfig.validate.titleLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: testimonialConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: testimonialConfig.validate.descriptionLength,
          option: {
            min: 5,
            max: 2000,
          },
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};

module.exports = validation;
