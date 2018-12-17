"use strict";
var crypto = require("crypto");
const Validator = require("validator");
const isEmpty = require("../validation/isEmpty");
const PhoneNumber = require("awesome-phonenumber");
const HttpStatus = require("http-status");
const otherHelper = {};

otherHelper.generateRandomHexString = len => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};
otherHelper.sendResponse = (
  res,
  status,
  success,
  data,
  errors,
  msg,
  token,
  nodataMsg
) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (msg) response.msg = msg;
  if (token) response.token = token;
  return res.status(status).json(response);
};
otherHelper.paginationSendResponse = (res, status, success, data, errors, msg, pageno, pagesize, totaldata) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (msg) response.msg = msg;
  if (pageno) response.pageno = pageno;
  if (pagesize) response.pagesize = pagesize;
  if (totaldata) response.totaldata = totaldata;
  return res.status(status).json(response);
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

otherHelper.getquerySendResponse = async (registrationModel, page, size, sortq, findquery, selectquery, next) => {
  let datas = {};
  try {
    datas.data = await registrationModel
      .find(findquery)
      .select(selectquery)
      .sort(sortq)
      .skip((page - 1) * size)
      .limit(size * 1);
    datas.totaldata = await registrationModel.countDocuments({ IsDeleted: false });
  } catch (err) {
    next(err);
  }
  return datas;
};

otherHelper.slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
module.exports = otherHelper;
