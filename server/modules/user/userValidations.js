const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const config = require('./userConfig');
const otherHelper = require('../../helper/others.helper');
const validations = {};

validations.sanitizeRegister = (req, res, next) => {
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
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeLogin = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeUserScan = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'email',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeBio = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'bio',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeSkill = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'skill',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.sanitizeDescribe = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'describe',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validateLoginInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condtition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condtition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condtition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condtition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateRegisterInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'name',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.nameLength,
          option: { min: 2, max: 30 },
        },
      ],
    },
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
    {
      field: 'password',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
      ],
    },
    {
      field: 'password2',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.passLength,
          option: { min: 6, max: 30 },
        },
        {
          condition: 'IsEqual',
          msg: config.validate.isEqual,
          option: { one: data && data.password, two: data && data.password2 },
        },
      ],
    },
    {
      field: 'gender',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.isGender,
        },
        {
          condition: 'IsIn',
          msg: config.validate.noGender,
          option: ['male', 'female', 'other'],
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateUserScanInput = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'email',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsEmail',
          msg: config.validate.isEmail,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateBio = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'bio',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.bioLength,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateSkill = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'skill',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.skillLength,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateDescribe = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'describe',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsLength',
          msg: config.validate.describeLength,
        },
      ],
    },
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
validations.validateSubscribe = (req, res, next) => {
  const data = req.body;
  const SubscriberId = req.user.id;
  if (SubscriberId) {
    if (data.UserId && !isEmpty(data.UserId)) {
      const validateArray = [
        {
          field: 'UserId',
          validate: [
            {
              condition: 'IsMongoId',
              msg: config.validate.isMongoId,
            },
          ],
        },
      ];
      const errors = otherHelper.validation(data, validateArray);
      if (!isEmpty(errors)) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, config.validate.inerr, null);
      } else {
        next();
      }
    } else if (data.CompanyId && !isEmpty(data.CompanyId)) {
      const validateArray = [
        {
          field: 'CompanyId',
          validate: [
            {
              condition: 'IsMongoId',
              msg: config.validate.isMongoId,
            },
          ],
        },
      ];
      const errors = otherHelper.validation(data, validateArray);
      if (!isEmpty(errors)) {
        return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, config.validate.inerr, null);
      } else {
        next();
      }
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, config.validationMessage.userOrCompanyRequired, config.subscribeFail, null);
    }
  }
};
module.exports = validations;
