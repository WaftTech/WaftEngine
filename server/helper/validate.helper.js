const isEmpty = require('../validation/isEmpty');
const Validator = require('validator');
const PhoneNumber = require('awesome-phonenumber');

const validationHelper = {};

validationHelper.validate = (data, val) => {
  const errors = {};
  console.log('data: ', data.Subject);
  for (i = 0; i < val.length; i++) {
    console.log('validation length: ', val.length);
    let field = val[i].field;
    console.log(field);
    let validate = val[i].validate;
    console.log('data is(from validate.helper :before):', data[field]);

    data[field] = !isEmpty(data[field]) ? data[field] : '';
    console.log('data is(from validate.helper):', data[field]);

    for (j = 0; j < validate.length; j++) {
      console.log('validate length: ', validate.length);
      console.log('validate condition: ', validate[j].condition);
      switch (validate[j].condition) {
        case 'IsEmpty':
          console.log('subject: ', data[field]);
          Validator.isEmpty(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'IsDate':
          !Validator.isISO8601(data[field]) ? (errors[field] = validate[j].msg) : null;
          break;
        case 'String':
          if (validate[j].options) {
            console.log('option: ', validate[j].options);
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
            console.log('option: ', validate[j].date);
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
              console.log('region: ', validate[j].options.region);
              pn = new PhoneNumber(data[field], validate[j].options.region);
              console.log(JSON.stringify(pn, null, 4));
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
    let sanitize = san[i].sanitize;
    if (sanitize.toDate) {
      req.body[field] = Validator.toDate(req.body[field]);
    }
    if (sanitize.trim) {
      req.body[field] = Validator.trim(req.body[field]);
      console.log(req.body.Subject);
    }
  }
  return true;
};

module.exports = validationHelper;
