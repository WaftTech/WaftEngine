const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./roleConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.validateRole = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'rolesTitle',
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
      field: 'moduleName',
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
      field: 'moduleId',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
    {
      field: 'roleId',
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
      field: 'rolesTitle',
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
      field: 'moduleName',
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
      field: 'moduleId',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'roleId',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
module.exports = validations;
