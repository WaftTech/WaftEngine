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
otherHelper.paginationSendResponse = (res, status, data, msg, pageno, pagesize, totaldata) => {
  const response = {};
  if (data) response.data = data;
  if (msg) response.msg = msg;
  if (pageno) response.page = pageno;
  if (pagesize) response.size = pagesize;
  if (totaldata) response.totaldata = totaldata;
  return res.status(status).json(response);
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
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};
module.exports = otherHelper;
