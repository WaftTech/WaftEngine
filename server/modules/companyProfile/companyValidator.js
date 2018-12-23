const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const companyConfig = require('./companyConfig');

// validation helper
const { validate, sanitize } = require('./../../helper/validate.helper');

const companyValidation = {};

companyValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'companyName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validationMessage.companyNameRequired,
        },
      ],
    },
    {
      field: 'address',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validationMessage.addressRequired,
        },
      ],
    },
    {
      field: 'contactNumber',
      validate: [
        {
          condition: 'IsPhoneNumber',
          msg: companyConfig.validationMessage.phonenumberInvalid,
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmail',
          msg: companyConfig.validationMessage.emailInvalid,
        },
      ],
    },
    {
      field: 'web',
      validate: [
        {
          condition: 'IsURL',
          msg: companyConfig.validationMessage.webInvalid,
          options: {
            protocols: ['https', 'http'],
          },
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

companyValidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'companyName',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'address',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'contactPerson',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'contactPersonNepali',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'web',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

module.exports = companyValidation;
