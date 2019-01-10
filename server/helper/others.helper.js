'use strict';
const crypto = require('crypto');
const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');
const PhoneNumber = require('awesome-phonenumber');
const HttpStatus = require('http-status');
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
      return { status: false, data: 'Provided no is invalid mobile no.' };
    } else if (!pn.isMobile()) {
      return { status: false, data: 'Provided no should be mobile no.' };
    } else if (pn.isValid()) {
      return { status: true, data: pn.getNumber('e164') };
    } else {
      return { status: true, data: pn.getNumber('e164') };
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
  if (totaldata) response.totaldata = totaldata;
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
    const sanitization = sanitizeObj.sanitize;
    if (sanitization.rtrim) {
      req.body[sanitizeObj.field] = Validator.rtrim(req.body[sanitizeObj.field]);
    }
    if (sanitization.ltrim) {
      req.body[sanitizeObj.field] = Validator.ltrim(req.body[sanitizeObj.field]);
    }
    if (sanitization.blacklist) {
      req.body[sanitizeObj.field] = Validator.blacklist(req.body[sanitizeObj.field]);
    }
    if (sanitization.whitelist) {
      req.body[sanitizeObj.field] = Validator.whitelist(req.body[sanitizeObj.field]);
    }
    if (sanitization.trim) {
      req.body[sanitizeObj.field] = Validator.trim(req.body[sanitizeObj.field]);
    }
    if (sanitization.escape) {
      req.body[sanitizeObj.field] = Validator.escape(req.body[sanitizeObj.field]);
    }
    if (sanitization.unescape) {
      req.body[sanitizeObj.field] = Validator.unescape(req.body[sanitizeObj.field]);
    }
    if (sanitization.toBoolean) {
      req.body[sanitizeObj.field] = Validator.toBoolean(req.body[sanitizeObj.field]);
    }
    if (sanitization.toInt) {
      req.body[sanitizeObj.field] = Validator.toInt(req.body[sanitizeObj.field]);
    }
    if (sanitization.toFloat) {
      req.body[sanitizeObj.field] = Validator.toFloat(req.body[sanitizeObj.field]);
    }
    if (sanitization.toDate) {
      req.body[sanitizeObj.field] = Validator.toDate(req.body[sanitizeObj.field]);
    }
  });
  return true;
};
otherHelper.validation = (data, validationArray) => {
  let errors = {};
  validationArray.forEach(validationObj => {
    const value = data[validationObj.field];
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
