const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const formConfig = require('./formConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validations = {};

validations.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'full_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'mobile',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validation = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'full_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: formConfig.validate.nameLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],

    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: formConfig.validate.email,

        },
      ],

    },
    {
      field: 'mobile',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsPhone',
          msg: formConfig.validate.phone,

        },
      ],

    },
    {
      field: 'is_identified',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsBoolean',
          msg: formConfig.validate.boolean
        }
      ],

    },

    {
      field: 'type_of_property',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
      ],

    },
    //
    {
      field: 'looking_for_city',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
      ],

    },
    {
      field: 'resident_status',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
      ],

    },
    {
      field: 'employment_type',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
      ],

    },
    {
      field: 'monthly_income',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
      ],

    },
    {
      field: 'is_co_borrower',
      validate: [
        {
          condition: 'IsEmpty',
          msg: formConfig.validate.empty,
        },
        {
          condition: 'IsBoolean',
          msg: formConfig.validate.boolean,
        }
      ],

    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = validations;
