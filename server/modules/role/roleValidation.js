const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./roleConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.validateRole = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'role_title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.rolesLength,
          option: { min: 2, max: 20 },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.descriptionLength,
          option: { min: 5, max: 200 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
validations.validateModule = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'module_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.rolesLength,
          option: { min: 2, max: 20 },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.descriptionLength,
          option: { min: 5, max: 200 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
validations.validateAccess = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'module_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
    {
      field: 'role_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, nul, errors, 'invalid object id', null);
  } else {
    next();
  }
};

validations.sanitizeRole = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'role_title',
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
validations.sanitizeModule = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_name',
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
validations.sanitizeAccess = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_id',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'role_id',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
module.exports = validations;
