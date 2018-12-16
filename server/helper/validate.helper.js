const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');
const PhoneNumber = require('awesome-phonenumber');

const validationHelper = {};

validationHelper.validate = (data, val) => {
  const errors = {};
  for (i = 0; i < val.length; i++) {
    let field = val[i].field;
    let validate = val[i].validate;

    data[field] = !isEmpty(data[field]) ? data[field] : '';

    for (j = 0; j < validate.length; j++) {
      switch (validate[j].condition) {
        case 'IsEmpty':
          Validator.isEmpty(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsDate':
          !Validator.isISO8601(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'String':
          if (validate[j].options) {
            !Validator.isLength(data[field], validate[j].options) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsAfter':
          if (validate[j].date) {
            !Validator.isAfter(data[field], validate[j].date) ? (errors[field] = validate[j].msg) : null;
          } else {
            !Validator.isAfter(data[field]) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsBefore':
          if (validate[j].date) {
            !Validator.isBefore(data[field], validate[j].date) ? (errors[field] = validate[j].msg) : null;
          } else {
            !Validator.isBefore(data[field], validate[j].date) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsJSON':
          !Validator.isJSON(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsJWT':
          !Validator.isJWT(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsPhoneNumber':
          if (validate[j].options) {
            let pn;
            if (validate[j].options.region) {
              pn = new PhoneNumber(data[field], validate[j].options.region);
            } else {
              pn = new PhoneNumber(data[field]);
            }
            if (validate[j].options.isMobile) pn.isValid() && pn.isMobile() ? null : (errors[field] = validate[j].msg);
            if (validate[j].options.isFixedLine) pn.isValid() && pn.isFixedLine() ? null : (errors[field] = validate[j].msg);
          } else {
            let pn = new PhoneNumber(data[field]);
            !pn.isValid() ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsMONGOID':
          !Validator.isMongoId(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsNumeric':
          !Validator.isNumeric(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;

        default:
          break;
      }
      if (errors[field]) {
        break;
      }
    }
  }
  return errors;
};

validationHelper.sanitize = (req, san) => {
  for (i = 0; i < san.length; i++) {
    let field = san[i].field;
    req.body[field] = !isEmpty(req.body[field]) ? req.body[field] : '';

    let sanitize = san[i].sanitize;
    if (sanitize.toDate) {
      req.body[field] = Validator.toDate(req.body[field]);
    }
    if (sanitize.trim) {
      req.body[field] = Validator.trim(req.body[field]);
    }
    if (sanitize.escape) {
      req.body[field] = Validator.escape(req.body[field]);
    }
  }
  return true;
};

module.exports = validationHelper;
