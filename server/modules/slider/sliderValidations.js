const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sliderConfig = require('./sliderConfig');
const validations = {};

validations.sanitize = (req, res, next) => {
  otherHelper.sanitize(req, [
    {
      field: 'slider_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'slider_key',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validations.validate = async (req, res, next) => {
  let errors = otherHelper.validation(req.body, [
    {
      field: 'slider_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: sliderConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: sliderConfig.validate.length,
        },
      ],
    },
    {
      field: 'slider_key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: sliderConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: sliderConfig.validate.length,
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'validation err!', null);
  } else {
    next();
  }
};
module.exports = validations;
