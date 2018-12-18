const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const fiscalConfig = require('./fiscalConfig');
const OtherHelper = require('../../helper/others.helper');
const Validatedata = {};

Validatedata.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'FiscalYear',
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
      field: 'FiscalYear',
      validate: [
        {
          condition: 'IsEmpty',
          msg: fiscalConfig.validateFiscal.EmptyFiscalYear,
        },
        {
          condition: 'IsLength',
          msg: fiscalConfig.validateFiscal.FiscalLength,
          option: { min: 4, max: 15 },
        },
      ],
    },
    {
      field: 'From',
      validate: [
        {
          condition: 'IsEmpty',
          msg: fiscalConfig.validateFiscal.EmptyFrom,
        },
        {
          condition: 'IsLength',
          msg: fiscalConfig.validateFiscal.FromLength,
          option: { min: 3, max: 15 },
        },
        {
          condition: 'IsAfter',
          msg: fiscalConfig.validateFiscal.IsAfter,
          date: '1971',
        },
      ],
    },
    {
      field: 'To',
      validate: [
        {
          condition: 'IsEmpty',
          msg: fiscalConfig.validateFiscal.EmptyTo,
        },
        {
          condition: 'IsLength',
          msg: fiscalConfig.validateFiscal.ToLength,
          option: { min: 3, max: 15 },
        },
        {
          condition: 'IsDate',
          msg: fiscalConfig.validateFiscal.InvalidTo,
        },
      ],
    },
    // {
    //   field: 'PhoneNumber',
    //   validate: [
    //     {
    //       condition: 'IsPhone',
    //       msg: fiscalConfig.validateFiscal.IsPhone,
    //       option: { isMobile: true, isLandLine: false },
    //     },
    //   ],
    // },
  ];
  const errors = OtherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    console.log(errors);
    return OtherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};
module.exports = Validatedata;
