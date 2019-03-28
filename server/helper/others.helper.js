'use strict';
const crypto = require('crypto');
const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');
const PhoneNumber = require('awesome-phonenumber');
const httpStatus = require('http-status');
const otherHelper = {};

otherHelper.generateRandomHexString = len => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};
otherHelper.generateRandomNumberString = len => {
  return Math.floor(Math.random() * 8999 + 1000);
};
otherHelper.parsePhoneNo = (phone, RegionCode) => {
  try {
    var pn = new PhoneNumber(phone, RegionCode);
    console.log(pn);
    if (!pn.isValid()) {
      return {
        status: false,
        data: 'Provided no is invalid mobile no.',
      };
    } else if (!pn.isMobile()) {
      return {
        status: false,
        data: 'Provided no should be mobile no.',
      };
    } else if (pn.isValid()) {
      return {
        status: true,
        data: pn.getNumber('e164'),
      };
    } else {
      return {
        status: true,
        data: pn.getNumber('e164'),
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
otherHelper.sendResponse = (res, status, success, data, errors, msg, token) => {
  const response = {};
  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (errors !== null) response.errors = errors;
  if (msg !== null) response.msg = msg;
  if (token !== null) response.token = token;
  return res.status(status).json(response);
};
otherHelper.paginationSendResponse = (res, status, success, data, msg, pageno, pagesize, totaldata) => {
  const response = {};
  if (data) response.data = data;
  if (success !== null) response.success = success;
  if (msg) response.msg = msg;
  if (pageno) response.page = pageno;
  if (pagesize) response.size = pagesize;
  if (typeof totaldata === 'number') response.totaldata = totaldata;
  return res.status(status).json(response);
};
otherHelper.getquerySendResponse = async (model, page, size, sortq, findquery, selectquery, next, populate) => {
  let datas = {};
  try {
    datas.data = await model
      .find(findquery)
      .select(selectquery)
      .sort(sortq)
      .skip((page - 1) * size)
      .limit(size * 1)
      .populate(populate);
    datas.totaldata = await model.countDocuments(findquery);
    return datas;
  } catch (err) {
    next(err);
  }
};
otherHelper.sanitize = (req, sanitizeArray) => {
  sanitizeArray.forEach(sanitizeObj => {
    let sanitizefield = req.body[sanitizeObj.field];
    sanitizefield = !isEmpty(sanitizefield) ? sanitizefield : '';
    const sanitization = sanitizeObj.sanitize;
    if (sanitization.rtrim) {
      sanitizefield = Validator.rtrim(sanitizefield);
    }
    if (sanitization.ltrim) {
      sanitizefield = Validator.ltrim(sanitizefield);
    }
    if (sanitization.blacklist) {
      sanitizefield = Validator.blacklist(sanitizefield);
    }
    if (sanitization.whitelist) {
      sanitizefield = Validator.whitelist(sanitizefield);
    }
    if (sanitization.trim) {
      sanitizefield = Validator.trim(sanitizefield);
    }
    if (sanitization.escape) {
      sanitizefield = Validator.escape(sanitizefield);
    }
    if (sanitization.unescape) {
      sanitizefield = Validator.unescape(sanitizefield);
    }
    if (sanitization.toBoolean) {
      sanitizefield = Validator.toBoolean(sanitizefield);
    }
    if (sanitization.toInt) {
      sanitizefield = Validator.toInt(sanitizefield);
    }
    if (sanitization.toFloat) {
      sanitizefield = Validator.toFloat(sanitizefield);
    }
    if (sanitization.toDate) {
      sanitizefield = Validator.toDate(sanitizefield);
    }
  });
  return true;
};
otherHelper.validation = (data, validationArray) => {
  let errors = {};
  validationArray.forEach(validationObj => {
    let value = data[validationObj.field];
    value = !isEmpty(value) ? value : '';
    const validation = validationObj.validate;
    for (let i = 0; i < validation.length; i++) {
      const val = validation[i];
      switch (val.condition) {
        case 'IsEmpty':
          if (Validator.isEmpty(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsLength':
          if (val.option) {
            if (!Validator.isLength(value, val.option)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsInt':
          if (val.option) {
            if (!Validator.isInt(value, val.option)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsEqual':
          if (val.option) {
            if (!Validator.equals(val.option.one, val.option.two)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsMongoId':
          if (!Validator.isMongoId(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsIn':
          if (val.option) {
            if (!Validator.isIn(value, val.option)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsDate':
          if (!Validator.isISO8601(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsEmail':
          if (!Validator.isEmail(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsBoolean':
          if (!Validator.isBoolean(value.toString())) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsAfter':
          if (val.option) {
            if (!Validator.isAfter(value, val.option.date)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsURL':
          if (val.option) {
            if (!Validator.isURL(value, val.option.protocols)) {
              errors[validationObj.field] = val.msg;
            }
          }
          break;
        case 'IsUppercase':
          if (!Validator.isUppercase(value)) {
            errors[validationObj.field] = val.msg;
          }
          break;
        case 'IsPhone':
          let pn = new PhoneNumber(value);
          console.log(JSON.stringify(pn, null, 4));
          if (pn.isValid()) {
            if (val.option) {
              if (val.option.isMobile) {
                if (!pn.isMobile()) {
                  errors[validationObj.field] = 'Enter mobile number';
                }
              } else {
                if (!pn.isFixedLine()) {
                  errors[validationObj.field] = 'Enter landline number';
                }
              }
            }
          } else {
            errors[validationObj.field] = val.msg;
          }
          break;
        default:
          break;
      }
      if (errors[validationObj.field]) {
        i = validation.length;
      }
    }
  });
  return errors;
};
otherHelper.slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
module.exports = otherHelper;
