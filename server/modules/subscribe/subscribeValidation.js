const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const subscribeSch = require('./subscribeSchema');
const validations = {};

validations.sanitize = (req, res, next) => {
  otherHelper.sanitize(req, [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validations.validate = async (req, res, next) => {
  const data = await subscribeSch.countDocuments({ email: req.body.email });
  let errors = otherHelper.validation(req.body, [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: 'This field is required',
        },
        {
          condition: 'IsLength',
          msg: 'This field length should be between 5 to 500',
          option: {
            min: 5,
            max: 500,
          },
        },
        {
          condition: 'IsEmail',
          msg: 'This field should be email type',
        },
      ],
    },
  ]);
  if (data) {
    errors['email'] = 'This email has already been subscribed! Thank You!!';
  }
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};
module.exports = validations;
