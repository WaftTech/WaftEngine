const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');
const PhoneNumber = require('awesome-phonenumber');

const validationHelper = {};

validationHelper.validate = (data1, val) => {
  const errors = {};
  let fdata;
  for (i = 0; i < val.length; i++) {
    let field = val[i].field;
    let validate = val[i].validate;
    let data = data1;

    if (field && field.split('.').length > 1) {
      for (let k = 0; k < field.split('.').length; k++) {
        data = !isEmpty(data[field.split('.')[k]]) ? data[field.split('.')[k]] : '';
      }
      fdata = '' + data;
    } else {
      fdata = !isEmpty(data[field]) ? '' + data[field] : '';
    }

    for (j = 0; j < validate.length; j++) {
      switch (validate[j].condition) {
        case 'IsEmpty':
          Validator.isEmpty(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsDate':
          !Validator.isISO8601(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'String':
          if (validate[j].options) {
            !Validator.isLength(fdata, validate[j].options) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsAfter':
          if (validate[j].date) {
            !Validator.isAfter(fdata, validate[j].date) ? (errors[field] = validate[j].msg) : null;
          } else {
            !Validator.isAfter(fdata) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsBefore':
          if (validate[j].date) {
            !Validator.isBefore(fdata, validate[j].date) ? (errors[field] = validate[j].msg) : null;
          } else {
            !Validator.isBefore(fdata, validate[j].date) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsJSON':
          !Validator.isJSON(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsJWT':
          !Validator.isJWT(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsPhoneNumber':
          if (validate[j].options) {
            let pn;
            if (validate[j].options.region) {
              pn = new PhoneNumber(fdata, validate[j].options.region);
            } else {
              pn = new PhoneNumber(fdata);
            }
            if (validate[j].options.isMobile) pn.isValid() && pn.isMobile() ? null : (errors[field] = validate[j].msg);
            if (validate[j].options.isFixedLine) pn.isValid() && pn.isFixedLine() ? null : (errors[field] = validate[j].msg);
          } else {
            let pn = new PhoneNumber(fdata);
            !pn.isValid() ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsMONGOID':
          if (!isEmpty(fdata)) {
            !Validator.isMongoId(fdata) ? (errors[field] = validate[j].msg) : null;
          }
          break;
        case 'IsNumeric':
          !Validator.isNumeric(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsEmail':
          !Validator.isEmail(fdata) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'Contains':
          !Validator.isIn(fdata, validate[j].options) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsInt':
          !Validator.isInt(fdata, validate[j].options) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsBoolean':
          !Validator.isBoolean(fdata, validate[j].options) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsURL':
          if (validate[j].options) {
            !Validator.isURL(data[field], validate[j].options.protocols) ? (errors[field] = validate[j].msg) : null;
          } else {
            !Validator.isURL(data[field]) ? (errors[field] = validate[j].msg) : null;
          }
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
