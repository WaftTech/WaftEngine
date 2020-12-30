const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./roleConfig');
const otherHelper = require('../../helper/others.helper');
const roleConfig = require('./roleConfig');
const moduleGroupSchema = require('./moduleGroupSchema');
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
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, roleConfig.errorIn.inputErrors, null);
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
      field: 'order',
      validate: [
        {
          condition: 'IsInt',
          msg: config.validate.isInt,
        }
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
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, roleConfig.errorIn.inputErrors, null);
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
validations.validateModuleGroup = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'module_group',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
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
  let errors = otherHelper.validation(data, validateArray);

  let key_filter = { is_deleted: false, module_group: data.module_group }
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } }
  }
  const already_key = await moduleGroupSchema.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, module_group: 'module_group already exist' }
  }


  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, nul, errors, roleConfig.errorIn.inputErrors, null);
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

validations.sanitizeModuleGroup = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'module_group',
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
