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
validations.sanitizeUpdateProfile = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'date_of_birth',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'bio',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'skills',
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
    {
      field: 'roles',
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
validations.sanitizeUpdateUserProfile = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'name',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'bio',
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
    {
      field: 'phone',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'location',
      sanitize: {
        trim: true,
      },
    },
  ];
  otherHelper.sanitize(req, sanitizeArray);
  next();
};
validations.validateUpdateUserProfile = (req, res, next) => {
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
      field: 'phone',
      validate: [
        {
          condition: 'IsPhoneNumber',
          msg: config.validate.invalid,
        },
      ],
    },
    {
      field: 'date_of_birth',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validate.invalid,
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
validations.validateUpdateProfile = (req, res, next) => {
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
      field: 'date_of_birth',
      validate: [
        {
          condition: 'IsDate',
          msg: config.validate.isDate,
        },
      ],
    },
    {
      field: 'email_verified',
      validate: [
        {
          condition: 'IsBoolean',
          msg: config.validate.inerr,
        },
      ],
    },
    {
      field: 'roles',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsMONGOID',
          msg: config.validate.invalid,
        },
      ],
    },
    {
      field: 'phone',
      validate: [
        {
          condition: 'IsPhoneNumber',
          msg: config.validate.invalid,
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
validations.validateLoginlogsLogut = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'loginID',
      validate: [
        {
          condition: 'IsEmpty',
          msg: config.validate.empty,
        },
        {
          condition: 'IsMONGOID',
          msg: config.validate.inerr,
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
validations.validatechangePassword = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'newPassword',
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
      field: 'newPassword2',
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
          option: { one: data.newPassword, two: data.newPassword2 },
        },
      ],
    },
    {
      field: 'oldPassword',
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
  ];
  const errors = otherHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, config.validate.inerr, null);
  } else {
    next();
  }
};
module.exports = validations;
