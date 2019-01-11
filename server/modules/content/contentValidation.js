const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const contentConfig = require('./contentConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'ContentName',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'Key',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'Description',
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
      field: 'ContentName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: contentConfig.validation.nameLength,
        },
      ],
    },
    {
      field: 'Key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: contentConfig.validation.keyLength,
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: contentConfig.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: contentConfig.validation.descriptionLength,
        },
      ],
    },
    {
      field: 'PublishFrom',
      validate: [
        {
          condition: 'IsDate',
          msg: contentConfig.validation.isDate,
        },
      ],
    },
    {
      field: 'PublishTo',
      validate: [
        {
          condition: 'IsDate',
          msg: contentConfig.validation.isDate,
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
