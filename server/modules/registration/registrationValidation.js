const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');

const registrationModel = require('./registration');

const registrationConfig = require('./registrationConfig');

// validation helper
const validationhelper = require('./../../helper/validate.helper');

const registrationValidation = {};

registrationValidation.validate = async (req, res, next) => {
  // let errors = await validationhelper.validateArray([
  //   { data: req.body.Subject, message: registrationConfig.validationMessage.subjectRequired, condition: { min: 2, max: 50 }, message2: registrationConfig.validationMessage.subjectInvalidLength },
  //   { data: req.body.RegistrationNo, message: registrationConfig.validationMessage.registrationNoRequired, condition: { min: 2, max: 50 }, message2: registrationConfig.validationMessage.registrationInvalidLength },
  //   { data: req.body.SenderName, message: registrationConfig.validationMessage.senderRequired, condition: { min: 2, max: 50 }, message2: registrationConfig.validationMessage.senderInvalidLength },
  //   { data: req.body.ReceiverName, message: registrationConfig.validationMessage.receiverRequired, condition: { min: 2, max: 50 }, message2: registrationConfig.validationMessage.receiverInvalidLength },
  // ]);

  let errors = await validationhelper.validate(req.body, [
    {
      field: 'Subject',
      validate: [
        {
          condition: 'IsEmpty',
          msg: 'Subject should not be empty',
        },
        {
          condition: 'MinCheck',
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
          condition: 'MinCheck',
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
          condition: 'MinCheck',
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
          condition: 'MinCheck',
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
