const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const { validate, sanitize } = require('./../../helper/validate.helper');

const userConfig = require('./userConfig');
const userModel = require('./User');

const uservalidation = {};

uservalidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.nameRequired,
        },
        {
          condition: 'String',
          msg: userConfig.validationMessage.nameInvalidLength,
          options: {
            min: 5,
          },
        },
      ],
    },
    {
      field: 'designation',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.designationInvalid,
        },
      ],
    },
    {
      field: 'gender',
      validate: [
        {
          condition: 'IsEmpty',
          msg: LeaveTypeConfig.ValidationMessage.GenderRequired,
        },
        {
          condition: 'Contains',
          msg: LeaveTypeConfig.ValidationMessage.GenderInvalid,
          options: ['Male', 'Female', 'Other'],
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.emailRequired,
        },
        {
          condition: 'IsEmail',
          msg: userConfig.validationMessage.emailInvalid,
        },
      ],
    },
    {
      field: 'password2',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.password2Required,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.passwordRequired,
        },
        {
          condition: 'String',
          msg: userConfig.validationMessage.passwordInvalidLength,
          options: {
            min: 6,
            max: 30,
          },
        },
      ],
    },

    {
      field: 'ReporterID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.ReporterIDRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.ReporterIDInvalid,
        },
      ],
    },
    {
      field: 'roles',
      validate: [
        {
          condition: 'IsEmpty',
          msg: userConfig.validationMessage.rolesRequired,
        },
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.rolesInvalid,
        },
      ],
    },
    {
      field: 'permanentaddress.state',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.stateInvalid,
        },
      ],
    },
    {
      field: 'permanentaddress.district',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.districtInvalid,
        },
      ],
    },
    {
      field: 'permanentaddress.vdc',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.vdcInvalid,
        },
      ],
    },
    {
      field: 'tempaddress.state',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.stateInvalid,
        },
      ],
    },
    {
      field: 'tempaddress.district',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.districtInvalid,
        },
      ],
    },
    {
      field: 'tempaddress.vdc',
      validate: [
        {
          condition: 'IsMONGOID',
          msg: userConfig.validationMessage.vdcInvalid,
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

uservalidation.sanitize = async (req, res, next) => {
  await sanitize(req, [
    {
      field: 'name',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
        escape: true,
      },
    },
  ]);
  next();
};

uservalidation.duplicateValidation = async (req, res, next) => {
  const filter = { email: req.body.email };
  if (req.body._id) {
    filter._id = { $ne: req.body._id };
  }
  let dstatus = await userModel.findOne(filter);
  if (dstatus != null) {
    let errors = { email: userConfig.validationMessage.emailExists };
    return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};

uservalidation.checkPassword = (req, res, next) => {
  if (!(req.body.password === req.body.password2)) {
    let errors = { password: userConfig.validationMessage.passwordMismatch };
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error', null);
  } else {
    next();
  }
};

module.exports = uservalidation;
