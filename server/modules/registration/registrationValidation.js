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
  
  console.log('SUbject: ', req.body.Subject);

  let errors = await validate(req.body, [
    {
      field: 'Subject',
      validate: [
        {
          condition: 'IsEmpty',
          msg: 'Subject should not be empty',
        },
        {
          condition: 'String',
          msg: 'Subject shoud not be less than 5',
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
          msg: 'Registration No should not be empty',
        },
        {
          condition: 'String',
          msg: 'Registration No shoud not be less than 5',
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
          msg: 'Sender Name should not be empty',
        },
        {
          condition: 'String',
          msg: 'Sender Name shoud not be less than 5',
          options: {
            min: 5,
          },
        },
      ],
    },
    {
      field: 'ReceiverName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: 'Receiver Name should not be empty',
        },
        {
          condition: 'String',
          msg: 'Receiver Name shoud not be less than 5',
          options: {
            min: 5,
          },
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    console.log('errors from registrationValidation: ', errors);
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
    let errors = { RegistrationNo: registrationConfig.validationMessage.registrationNoexists };
    return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

module.exports = registrationValidation;
