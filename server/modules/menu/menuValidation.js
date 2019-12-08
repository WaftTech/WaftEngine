const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const menuConfig = require('./menuConfig');
const otherHelper = require('../../helper/others.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        rtrim: true,
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
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: menuConfig.validate.titleLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);

  //   console.log('error',errors);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};

validation.itemsanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'title',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'link',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};

validation.itemvalidate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'title',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: menuConfig.validate.titleLength,
          option: {
            min: 3,
            max: 100,
          },
        },
      ],
    },
    {
      field: 'url',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: menuConfig.validate.descriptionLength,
          option: {
            min: 5,
            max: 2000,
          },
        },
      ],
    },
    {
      field: 'menu_sch_id',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        {
          condition: 'IsMongoId',
          msg: menuConfig.validate.invalid,
        },
      ],
    },
    {
      field: 'is_internal',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        {
          condition: 'IsBoolean',
          msg: menuConfig.validate.invalid,
        },
      ],
    },
    {
      field: 'target',
      validate: [
        {
          condition: 'IsEmpty',
          msg: menuConfig.validate.empty,
        },
        // {
        //   condition: 'IsIn',
        //   msg: menuConfig.validate.invalid,
        //   enum: ['_blank', '_self', '_parent', '_top'],
        // },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);

  //   console.log('error',errors);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, 'input errors', null);
  } else {
    next();
  }
};
module.exports = validation;
