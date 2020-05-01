const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');
const settingConfig = require('./settingConfig');
const settingValidation = {};

settingValidation.validate = async (req, res, next) => {
  let errors = await otherHelper.validation(req.body, [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: settingConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: settingConfig.validate.titleLength,
          options: {
            min: 2,
            max: 50,
          },
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

settingValidation.sanitize = async (req, res, next) => {
  await otherHelper.sanitize(req, [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};

module.exports = settingValidation;
