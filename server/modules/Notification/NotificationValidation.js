const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');
const NotificationModel = require('./Notification');
const NotificationConfig = require('./NotificationConfig');
const validationhelper = require('./../../helper/validate.helper');
const NotificationValidation = {};

NotificationValidation.validate = async (req, res, next) => {
  let errors = await validationhelper.validate(req.body, [
    {
      field: 'Module',
      validate: [
        {
          condition: 'Contains',
          msg: NotificationConfig.ValidationMessage.ModuleRequired,
          options: ['Leave'],
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: NotificationConfig.ValidationMessage.DescriptionRequired,
        },
      ],
    },
  ]);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error', null);
  } else {
    next();
  }
};
module.exports = NotificationValidation;
