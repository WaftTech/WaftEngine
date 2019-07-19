const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const templateConfig = require('./templateConfig');
const templateValidation = {};

templateValidation.sanitze = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'template_name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'template_key',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'information',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'variables',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'from',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'subject',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'body',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'alternative_text',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

templateValidation.validate = (req, res, next) => {
  const validateArray = [
    {
      field: '_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsMongoId',
          msg: templateConfig.validate.isMongoID,
        },
      ],
    },
    {
      field: 'template_name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'template_key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'information',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength300,
          option: { min: 2, max: 300 },
        },
      ],
    },
    {
      field: 'variables',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
      ],
    },
    {
      field: 'from',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength50,
          option: { min: 2, max: 50 },
        },
      ],
    },
    {
      field: 'subject',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2, max: 300 },
        },
      ],
    },
    {
      field: 'body',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2 },
        },
      ],
    },
    {
      field: 'alternate_text',
      validate: [
        {
          condition: 'IsEmpty',
          msg: templateConfig.validate.isEmpty,
        },
        {
          condition: 'IsLength',
          msg: templateConfig.validate.isLength,
          option: { min: 2 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(req.body, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'invalid input', null);
  } else {
    next();
  }
};

module.exports = templateValidation;
