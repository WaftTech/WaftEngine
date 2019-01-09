const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const settingsConfig = require('./settingsConfig');

// validation helper
const { validate, sanitize } = require('./../../helper/validate.helper');

const settingsValidation = {};

settingsValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: settingsConfig.validationMessage.keyRequired,
        },
        {
          condition: 'String',
          msg: settingsConfig.validationMessage.keyInvalidLength,
          options: {
            min: 2,
            max: 50,
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

settingsValidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'key',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};

module.exports = settingsValidation;
