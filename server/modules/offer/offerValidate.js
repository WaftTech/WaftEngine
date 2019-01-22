const HttpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const offerconfig = require('./offerconfig');

const validateInput = {};

validateInput.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'Offer_In',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'Offer_Link',
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
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validateInput.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'Offer_In',
      validate: [
        {
          condition: 'IsEmpty',
          msg: offerconfig.validateOffer.EmptyOffer,
        },
        {
          condition: 'IsLength',
          msg: offerconfig.validateOffer.LengthOffer,
          options: { min: 3, max: 200 },
        },
      ],
    },
    {
      field: 'Offer_Link',
      validate: [
        {
          condition: 'IsEmpty',
          msg: offerconfig.validateOffer.EmptyLink,
        },
        {
          condition: 'IsURL',
          msg: offerconfig.validateOffer.IsURL,
          options: { protocols: ['http', 'https'] },
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: offerconfig.validateOffer.EmptyDescription,
        },
        {
          condition: 'IsLength',
          msg: offerconfig.validateOffer.LengthDescription,
          options: { min: 5, max: 5000 },
        },
      ],
    },
    {
      field: 'Company',
      validate: [
        {
          condition: 'IsEmpty',
          msg: offerconfig.validateOffer.EmptyCompany,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'input error', null);
  } else {
    next();
  }
};

module.exports = validateInput;
