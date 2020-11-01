const loginLogSch = require('./loginlogSchema');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const otherHelper = require('../../../helper/others.helper');
const { secretOrKey } = require('../../../config/keys');
const internal = {};
const loginLogController = {};

internal.addloginlog = async (req, token, next) => {
  try {
    let jwtpayload = await jwt.verify(token, secretOrKey);
    let expires_in = new Date(jwtpayload.exp * 1000);
    let user_id = jwtpayload.id;
    const newlog = new loginLogSch({ user_id, expires_in, ip_address: req.clinfo.ip, device_info: req.clinfo.device, browser_info: req.clinfo.browser, token });
    return newlog.save();
  } catch (err) {
    next(err);
  }
};

loginLogController.logout = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    token = token.replace('Bearer ', '');
    let deactivelog = await loginLogSch.findOneAndUpdate({ token }, { $set: { is_active: false, logout_date: Date.now() } });
    if (deactivelog) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Logged out', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.OK, false, null, null, 'Logged out', null);
    }
  } catch (err) {
    next(err);
  }
};

loginLogController.getLogList = async (req, res, next) => {
  let user_id = req.user.id;
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQueryuery: sortQuery } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { user_id, ...searchQuery };
    selectQuery = 'login_date logout_date ip_address device_info browser_info is_active';
    const data = await otherHelper.getQuerySendResponse(loginLogSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data && data.data, 'logs Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};

loginLogController.removeToken = async (req, res, next) => {
  let { loginID } = req.body;
  let found;
  try {
    found = await loginLogSch.findOneAndUpdate({ _id: loginID, user_id: req.user.id }, { $set: { is_active: false, logout_date: Date.now() } }, { new: true }).select('login_date logout_date ip_address device_info browser_info is_active');
  } catch (err) {
    next(err);
  }
  if (found) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, found, null, 'Logged out', null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Invalid Data', null);
  }
};

module.exports = { internal, loginLogController };
