const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const faqConfig = require('./faqConfig');
const faqValidation = {};
faqValidation.Sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
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
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
faqValidation.catSanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

faqValidation.Validation = (req, res, next) => {
  const validateArray = [
    {
      field: 'title',
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
  ];
  const errors = otherHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
faqValidation.catValidation = (req, res, next) => {
  const validateArray = [
    {
      field: 'title',
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
  ];
  const errors = otherHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
module.exports = faqValidation;
