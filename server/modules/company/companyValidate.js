const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const companyConfig = require('./companyConfig');
const OtherHelper = require('../../helper/others.helper');
const Validatedata = {};

Validatedata.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'Name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'Description',
      sanitize: {
        trim: true,
      },
    },
  ];
  OtherHelper.sanitize(req, sanitizeArray);
  next();
};
Validatedata.validateInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'Name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validateCompany.EmptyCompany,
        },
        {
          condition: 'IsLength',
          msg: companyConfig.validateCompany.CompanyLength,
          options: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: companyConfig.validateCompany.EmptyImage,
        },
        {
          condition: 'IsLength',
          msg: companyConfig.validateCompany.DescriptionLength,
          options: { min: 5, max: 2000 },
        },
      ],
    },
  ];
  const errors = OtherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return OtherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = Validatedata;
