const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const Validator = require('validator');
const HttpStatus = require('http-status');
const DesignationSch = require('./Designation');

const DesignationConfig = require('./DesignationConfig');

// validation helper
const validationhelper = require('./../../helper/validate.helper');

const DesignationValidation = {};

DesignationValidation.Designation = async (req, res, next) => {
  console.log(req.body);
  let errors = await validationhelper.validate(req.body, [
    {
      field: 'Designation',
      validate: [
        {
          condition: 'IsEmpty',
          msg: DesignationConfig.validationMessage.DesignationRequired,
        },
        {
          condition: 'String',
          msg: DesignationConfig.validationMessage.DesignationInvalidlength,
          options: {
            min: 5,
            max: 10,
          },
        },
      ],
    },
  ]);

  if (!isEmpty(errors)) {
    //console.log(errors);
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, DesignationConfig.validationMessage.ValidationError, null);
  } else {
    next();
  }
};
module.exports = DesignationValidation;
