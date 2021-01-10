const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const teamConfig = require('./teamConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'position',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'description',
      sanitize: {
        trim: true,
      },
    },

  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: teamConfig.validate.titleLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: teamConfig.validate.descriptionLength,
          option: {
            min: 5,
            max: 2000,
          },
        },
      ],
    }, {
      field: 'date_of_birth',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        }
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        }
      ],
    },
    {
      field: 'position',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        }
      ],
    },
    {
      field: 'gender',
      validate: [
        {
          condition: 'IsEmpty',
          msg: teamConfig.validate.empty,
        }
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, teamConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

module.exports = validation;
