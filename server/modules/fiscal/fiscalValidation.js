const HttpStatus = require("http-status");
const isEmpty = require("../../validation/isEmpty");
const fiscalConfig = require("./fiscalConfig");
const OtherHelper = require("../../helper/others.helper");
const Validatedata = {};

Validatedata.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: "FiscalYear",
      sanitize: {
        rtrim: true,
<<<<<<< HEAD
        ltrim: true
      }
    }
=======
        ltrim: true,
        trim: true,
      },
    },
>>>>>>> b1fdf0874b63cae3a8f24817862e2f28e5dd6873
  ];
  OtherHelper.sanitize(req, sanitizeArray);
  next();
};
Validatedata.validateInput = (req, res, next) => {
  const data = req.body;
<<<<<<< HEAD
  data.FiscalYear = !isEmpty(data.FiscalYear) ? data.FiscalYear : "";
  data.From = !isEmpty(data.From) ? data.From : "";
  data.To = !isEmpty(data.To) ? data.To : "";
=======
>>>>>>> b1fdf0874b63cae3a8f24817862e2f28e5dd6873
  const validateArray = [
    {
      field: "FiscalYear",
      validate: [
        {
          condition: "IsEmpty",
          msg: fiscalConfig.validateFiscal.EmptyFiscalYear
        },
        {
          condition: "IsLength",
          msg: fiscalConfig.validateFiscal.FiscalLength,
          option: { min: 4, max: 10 }
        },
        {
<<<<<<< HEAD
          condition: "IsUppercase",
          msg: fiscalConfig.validateFiscal.Uppercase
        }
      ]
    }
    // {
    //   field: "From",
    //   validate: [
    //     {
    //       condition: "IsEmpty",
    //       msg: fiscalConfig.validateFiscal.EmptyFrom
    //     },
    //     {
    //       condition: "IsLength",
    //       msg: fiscalConfig.validateFiscal.FromLength,
    //       option: { min: 3, max: 4 }
    //     },
    //     {
    //       condition: "IsAfter",
    //       msg: fiscalConfig.validateFiscal.IsAfter,
    //       option: { date: "1971" }
    //     }
    //   ]
    // },
    // {
    //   field: "To",
    //   validate: [
    //     {
    //       condition: "IsEmpty",
    //       msg: fiscalConfig.validateFiscal.EmptyTo
    //     },
    //     {
    //       condition: "IsLength",
    //       msg: fiscalConfig.validateFiscal.ToLength,
    //       option: { min: 3, max: 4 }
    //     },
    //     {
    //       condition: "IsDate",
    //       msg: fiscalConfig.validateFiscal.InvalidTo
    //     }
    // ]
    // }
=======
          condition: 'IsUppercase',
          msg: fiscalConfig.validateFiscal.Uppercase,
        },
      ],
    },
    // {
    //   field: 'From',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: fiscalConfig.validateFiscal.EmptyFrom,
    //     },
    //     {
    //       condition: 'IsLength',
    //       msg: fiscalConfig.validateFiscal.FromLength,
    //       option: { min: 3, max: 4 },
    //     },
    //     {
    //       condition: 'IsAfter',
    //       msg: fiscalConfig.validateFiscal.IsAfter,
    //       option: { date: '1971' },
    //     },
    //   ],
    // },
    // {
    //   field: 'To',
    //   validate: [
    //     {
    //       condition: 'IsEmpty',
    //       msg: fiscalConfig.validateFiscal.EmptyTo,
    //     },
    //     {
    //       condition: 'IsLength',
    //       msg: fiscalConfig.validateFiscal.ToLength,
    //       option: { min: 3, max: 4 },
    //     },
    //     {
    //       condition: 'IsDate',
    //       msg: fiscalConfig.validateFiscal.InvalidTo,
    //     },
    //   ],
    // },
>>>>>>> b1fdf0874b63cae3a8f24817862e2f28e5dd6873
    // {
    //   field: 'Email',
    //   validate: [
    //     {
    //       condition: 'IsEmail',
    //       msg: fiscalConfig.validateFiscal.IsEmail,
    //     },
    //   ],
    // },
    // {
    //   field: 'Link',
    //   validate: [
    //     {
    //       condition: 'IsURL',
    //       msg: fiscalConfig.validateFiscal.IsURL,
    //       option: { protocols: ['http', 'https', 'ftp'] },
    //     },
    //   ],
    // },
    // {
    //   field: 'IsActive',
    //   validate: [
    //     {
    //       condition: 'IsBoolean',
    //       msg: fiscalConfig.validateFiscal.IsBoolean,
    //     },
    //   ],
    // },
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
    return OtherHelper.sendResponse(
      res,
      HttpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      "input error",
      null
    );
  } else {
    next();
  }
};
module.exports = Validatedata;
