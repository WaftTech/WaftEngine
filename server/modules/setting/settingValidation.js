const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');
const settingConfig = require('./settingConfig');
const settingSchema = require('./settingSchema');
const settingValidation = {};

settingValidation.validate = async (req, res, next) => {
  const data = req.body;
  const validateArray = [
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
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: settingConfig.validate.empty,
        }
      ],
    },
  ]
  let errors = otherHelper.validation(data, validateArray);

  let key_filter = { is_deleted: false, key: data.key }
  if (data._id) {
    key_filter = { ...key_filter, _id: { $ne: data._id } }
  }
  const already_key = await settingSchema.findOne(key_filter);
  if (already_key && already_key._id) {
    errors = { ...errors, key: 'key already exist' }
  }


  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, settingConfig.errorIn.inputErrors, null);
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
    {
      field: 'key',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};

module.exports = settingValidation;
