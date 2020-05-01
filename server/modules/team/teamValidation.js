const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const teamConfig = require('./teamConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    // {
    //   field: 'link',
    //   sanitize: {
    //     trim: true,
    //   },
    // },
  ];
  otherHelper.sanitize(req, sanitizeArray);
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
    },
  ];
  const errors = otherHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};

module.exports = validation;
