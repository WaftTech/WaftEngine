const validator = require('validator');
const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const socialConfig = require('./socialMediaConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validation = {};

// validation.sanitize = (req, res, next) => {
//   const sanitizeArray = [
//     {
//       field: 'stock_status_name',
//       sanitize: {
//         trim: true,
//       },
//     },
//   ];
//   sanitizeHelper.sanitize(req, sanitizeArray);
//   next();
// };

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: socialConfig.validate.empty,
        },
      ],
    },
    {
      field: 'description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: socialConfig.validate.empty,
        },
      ],
    },
    {
      field: 'url',
      validate: [
        {
          condition: 'IsEmpty',
          msg: socialConfig.validate.empty,
        },
      ],
    },
    {
      field: 'order',
      validate: [
        {
          condition: 'IsEmpty',
          msg: socialConfig.validate.empty,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};
module.exports = validation;
