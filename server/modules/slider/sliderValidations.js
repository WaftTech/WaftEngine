const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const sliderConfig = require('./sliderConfig');
const sliderSch = require('./sliderSchema');
const validations = {};

validations.sanitize = (req, res, next) => {
  sanitizeHelper.sanitize(req, [
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
  const data = req.body;
  const validateArray = [
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
          condition: 'IsProperKey',
          msg: 'not Valid Input',
        },
      ],
    },
  ]

  let errors = validateHelper.validation(data, validateArray);

  let key_filter = { is_deleted: false, slider_key: data.slider_key }
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } }
  }
  const already_key = await sliderSch.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, slider_key: 'slider_key already exist' }
  }


  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, sliderConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
module.exports = validations;
