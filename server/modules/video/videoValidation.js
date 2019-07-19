const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const videoConfig = require('./videoConfig');
const validation = {};
const otherHelper = require('../../helper/others.helper');

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'video_library',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'code',
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
      field: 'video_library',
      validate: [
        {
          condition: 'IsEmpty',
          msg: videoConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: videoConfig.validate.isLength,
        },
      ],
    },
    {
      field: 'code',
      validate: [
        {
          condition: 'IsEmpty',
          msg: videoConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: videoConfig.validate.isLength,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, falsse, null, errors, 'invalid input', null);
  } else {
    next();
  }
};

module.exports = validation;
