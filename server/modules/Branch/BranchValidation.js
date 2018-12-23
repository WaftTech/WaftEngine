const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const BranchModel = require('./Branch');

const BranchConfig = require('./BranchConfig');

const BranchValidation = {};

BranchValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'BranchName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: BranchConfig.validationMessage.BranchNameRequired,
        },
      ],
    },
    {
      field: 'Address',
      validate: [
        {
          condition: 'IsEmpty',
          msg: BranchConfig.validationMessage.AddressRequired,
        },
      ],
    },
    {
      field: 'ContactNo',
      validate: [
        {
          condition: 'IsEmpty',
          msg: BranchConfig.validationMessage.ContactNoRequired,
        },
        {
          condition: 'IsPhoneNumber',
          msg: BranchConfig.validationMessage.ContactNoInvalid,
        },
      ],
    },
    {
      field: 'Email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: BranchConfig.validationMessage.EmailRequired,
        },
        {
          condition: 'IsEmail',
          msg: BranchConfig.validationMessage.EmailInvalid,
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

module.exports = BranchValidation;
