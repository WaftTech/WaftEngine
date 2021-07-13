const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const faqConfig = require('./faqConfig');
const faqValidation = {};
faqValidation.Sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'question',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

faqValidation.Validation = (req, res, next) => {
  const validateArray = [
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: faqConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: faqConfig.validate.isLength,
        },
      ],
    },
    {
      field: 'question',
      validate: [
        {
          condition: 'IsEmpty',
          msg: faqConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: faqConfig.validate.isLength,
        },
      ],
    },
    {
      field: 'category',
      validate: [
        {
          condition: 'IsMongoId',
          msg: faqConfig.validate.isMongoId,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, faqConfig.errorIn.inputError, null);
  } else {
    next();
  }
};
module.exports = faqValidation;
