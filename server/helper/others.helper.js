'use strict';
var crypto = require('crypto');
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
otherHelper.sendResponse = (res, status, success, data, errors, msg, token, nodataMsg) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (msg) response.msg = msg;
  if (token) response.token = token;
  return res.status(status).json(response);
};
otherHelper.paginationSendResponse = (res, status, success, data, msg, pageno, pagesize, totaldata) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (success) response.success = success;
  if (msg) response.msg = msg;
  if (pageno) response.page = pageno;
  if (pagesize) response.size = pagesize;
  if (totaldata) response.totaldata = totaldata;
  return res.status(status).json(response);
};
otherHelper.getquerySendResponse = async (model, page, size, sortq, findquery, selectquery, next, populate) => {
  if (isEmpty(populate)) {
    populate = '';
  }
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
  } catch (err) {
    next(err);
  }
  return datas;
};
otherHelper.validation = (data, val) => {
  const errors = {};
  for (let i = 0; i < val.length; i++) {
    let field = val[i].field;
    let validate = val[i].validate;

    data[field] = !isEmpty(data[field]) ? data[field] : '';

    for (let j = 0; j < validate.length; j++) {
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
otherHelper.sanitize = (req, sanitizeArray) => {
  sanitizeArray.forEach(sanitizeObj => {
    let vals = req.body[sanitizeObj.field];
    vals = !isEmpty(vals) ? vals : '';
    const sanitization = sanitizeObj.sanitize;
    // console.log('sanitize', sanitizeObj);
    if (sanitization.rtrim) {
      vals = Validator.rtrim(vals);
    }
    if (sanitization.ltrim) {
      vals = Validator.ltrim(vals);
    }
    if (sanitization.blacklist) {
      vals = Validator.blacklist(vals);
    }
    if (sanitization.whitelist) {
      vals = Validator.whitelist(vals);
    }
    if (sanitization.trim) {
      vals = Validator.trim(vals);
    }
    if (sanitization.escape) {
      vals = Validator.escape(vals);
    }
    if (sanitization.unescape) {
      vals = Validator.unescape(vals);
    }
    if (sanitization.toBoolean) {
      vals = Validator.toBoolean(vals);
    }
    if (sanitization.toInt) {
      vals = Validator.toInt(vals);
    }
    if (sanitization.toFloat) {
      vals = Validator.toFloat(vals);
    }
    if (sanitization.toDate) {
      vals = Validator.toDate(vals);
    }
  });
  return;
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
