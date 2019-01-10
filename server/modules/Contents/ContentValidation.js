const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./contentConfig');
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
          msg: config.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validation.nameLength,
        },
      ],
    },
    {
      field: 'Key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validation.keyLength,
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validation.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validation.descriptionLength,
        },
      ],
    },
    {
      field: 'PublishFrom',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validation.isDate,
        },
      ],
    },
    {
      field: 'PublishTo',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validation.isDate,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = validations;
