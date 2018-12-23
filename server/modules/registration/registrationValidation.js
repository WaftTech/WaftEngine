const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');

const registrationModel = require('./registration');

const registrationConfig = require('./registrationConfig');

// validation helper
const { validate, sanitize } = require('./../../helper/validate.helper');

const registrationValidation = {};

registrationValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'Subject',
      validate: [
        {
          condition: 'IsEmpty',
          msg: registrationConfig.validationMessage.subjectRequired,
        },
        {
          condition: 'String',
          msg: registrationConfig.validationMessage.subjectInvalidLength,
          options: {
            min: 5,
          },
        },
      ],
    },
    {
      field: 'RegistrationNo',
      validate: [
        {
          condition: 'IsEmpty',
          msg: registrationConfig.validationMessage.registrationNoRequired,
        },
        {
          condition: 'String',
          msg: registrationConfig.validationMessage.registrationInvalidLength,
          options: {
            min: 5,
          },
        },
      ],
    },
    {
      field: 'SenderName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: registrationConfig.validationMessage.senderRequired,
        },
        {
          condition: 'String',
          msg: registrationConfig.validationMessage.senderInvalidLength,
          options: {
            min: 5,
            max: 30,
          },
        },
      ],
    },
    {
      field: 'ReceiverName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: registrationConfig.validationMessage.receiverRequired,
        },
        {
          condition: 'String',
          msg: registrationConfig.validationMessage.receiverInvalidLength,
          options: {
            min: 5,
            max: 30,
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

registrationValidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'Subject',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'SenderName',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'ReceiverName',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'Remarks',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

registrationValidation.duplicateValidation = async (req, res, next) => {
  const filter = { RegistrationNo: req.body.RegistrationNo };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  let dstatus = await registrationModel.findOne(filter);
  if (dstatus != null) {
    let errors = { RegistrationNo: registrationConfig.validationMessage.emailNoexists };
    return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

module.exports = registrationValidation;
