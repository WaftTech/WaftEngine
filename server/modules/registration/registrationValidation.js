const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');

const registrationModel = require('./registration');

const registrationConfig = require('./registrationConfig');


// validation helper
const validationhelper = require('./../../helper/validate.helper');


const registrationValidation ={};





registrationValidation.validate = async  (req, res, next)=> {
    

    let errors = validationhelper.validateArray(req, [{"field":"Subject", "message": registrationConfig.validationMessage.subjectRequired, "condition":{ min: 2, max: 50 },"message2": registrationConfig.validationMessage.subjectInvalidLength},{"field":"RegistrationNo", "message": registrationConfig.validationMessage.registrationNoRequired,  "condition":{ min: 2, max: 50 },"message2": registrationConfig.validationMessage.registrationInvalidLength},{"field":"SenderName", "message":registrationConfig.validationMessage.senderRequired,  "condition":{ min: 2, max: 50 }, "message2": registrationConfig.validationMessage.senderInvalidLength},{"field":"ReceiverName", "message":registrationConfig.validationMessage.receiverRequired,  "condition":{ min: 2, max: 50 }, "message2": registrationConfig.validationMessage.receiverInvalidLength } ]);

    if (!isEmpty(errors)) {
      return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null,errors, 'Validation Error.', null);
    } else {
      return next();
    }
   
  };


  module.exports = registrationValidation;