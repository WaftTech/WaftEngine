const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const contentConfig = require('./contentConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'key',
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
validations.validation = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
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
      field: 'key',
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
      field: 'description',
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
    // {
    //   field: 'publish_from',
    //   validate: [
    //     {
    //       condition: 'IsDate',
    //       msg: contentConfig.validation.isDate,
    //     },
    //   ],
    // },
    // {
    //   field: 'publish_to',
    //   validate: [
    //     {
    //       condition: 'IsDate',
    //       msg: contentConfig.validation.isDate,
    //     },
    //   ],
    // },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = validations;
