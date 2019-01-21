const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./roleConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.validateRole = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'RolesTitle',
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
      field: 'Description',
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
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
validations.validateModule = (req, res, next) => {
  const data = req.body;
  const validationArray = [
    {
      field: 'ModuleName',
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
    // {
    //   field: 'Description',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: config.validate.empty,
    //     },
    //     {
    //       condition: 'IsLength',
    //       msg: config.validate.descriptionLength,
    //       option: { min: 5, max: 200 },
    //     },
    //   ],
    // },
  ];
  const errors = otherHelper.validation(data, validationArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
validations.validateAccess = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'ModuleId',
      validate: [
        {
          condition: 'IsMongoId',
          msg: config.validate.isMongo,
        },
      ],
    },
    {
      field: 'RoleId',
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
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, nul, errors, 'invalid object id', null);
  } else {
    next();
  }
};

validations.sanitizeRole = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'RolesTitle',
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
validations.sanitizeModule = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'ModuleName',
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
validations.sanitizeAccess = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'ModuleId',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'RoleId',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
module.exports = validations;
