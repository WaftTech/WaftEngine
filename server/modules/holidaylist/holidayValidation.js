const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const holidayModel = require('./holiday');

const holidayConfig = require('./holidayConfig');

// validation helper
const { validate, sanitize } = require('./../../helper/validate.helper');

const holidayValidation = {};

holidayValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.titleRequired,
        },
        {
          condition: 'String',
          msg: holidayConfig.validationMessage.titleInvalidLength,
          options: {
            min: 5,
            max: 30,
          },
        },
      ],
    },
    {
      field: 'date',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.dateRequired,
        },
        {
          condition: 'IsDate',
          msg: holidayConfig.validationMessage.dateInvalid,
        },
      ],
    },
    {
      field: 'isActive',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.isActiveRequired,
        },
      ],
    },
    {
      field: 'ApplicableReligion',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.applicableReligionRequired,
        },
        {
          condition: 'Contains',
          msg: holidayConfig.validationMessage.applicableReligionoInvalid,
          options: ['All', 'Hindu', 'Muslim', 'Christian', 'Buddisht', 'Other'],
        },
      ],
    },
    {
      field: 'applicableTo',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.applicableToRequired,
        },
        {
          condition: 'Contains',
          msg: holidayConfig.validationMessage.applicabletoInvalidValue,
          options: ['All', 'Male', 'Female', 'Other'],
        },
      ],
    },
    {
      field: 'isHalfDay',
      validate: [
        {
          condition: 'IsEmpty',
          msg: holidayConfig.validationMessage.isHalfDayRequired,
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

holidayValidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'title',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'date',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'isActive',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'isHalfDay',
      sanitize: {
        toBoolean: true,
      },
    },
    {
      field: 'applicableTo',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

holidayValidation.duplicateValidation = async (req, res, next) => {
  let status = await holidayModel.findOne({ date: req.body.date });
  if (status != null) {
    let errors = { date: holidayConfig.validationMessage.dateAlreadyExists };
    return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, errors, 'Validation Error', null);
  } else {
    next();
  }
};

module.exports = holidayValidation;
