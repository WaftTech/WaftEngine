const loginlogs = require('./loginlogs');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const otherHelper = require('../../../helper/others.helper');
const { secretOrKey } = require('../../../config/keys');
const internal = {};
const loginlogController = {};

internal.addloginlog = async (req, token, next) => {
  try {
    let jwtpayload = await jwt.verify(token, secretOrKey);
    let expires_in = new Date(jwtpayload.exp * 1000);
    let user_id = jwtpayload.id;
    const newlog = new loginlogs({ user_id, expires_in, ip_address: req.clinfo.ip, device_info: req.clinfo.device, browser_info: req.clinfo.browser, token });
    return newlog.save();
  } catch (err) {
    next(err);
  }
};

loginlogController.logout = async (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    token = token.replace('Bearer ', '');
    let deactivelog = await loginlogs.findOneAndUpdate({ token }, { $set: { is_active: false, logout_date: Date.now() } });
    if (deactivelog) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Logged out', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Login First', null);
    }
  } catch (err) {
    next(err);
  }
};

loginlogController.getLogList = async (req, res, next) => {
  let user_id = req.user.id;
  try {
    let page;
    let size;
    let searchq;
    let sortquery;
    let selectq;
    const populate = '';

    const size_default = 10;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    sortquery = '-_id';

    searchq = { user_id };

    selectq = 'login_date logout_date ip_address device_info browser_info is_active';
    const data = await otherHelper.getquerySendResponse(loginlogs, page, size, sortquery, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data && data.data, 'logs Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};

loginlogController.removeToken = async (req, res, next) => {
  let { loginID } = req.body;
  let found;
  try {
    found = await loginlogs.findOneAndUpdate({ _id: loginID, user_id: req.user.id }, { $set: { is_active: false, logout_date: Date.now() } }, { new: true }).select('login_date logout_date ip_address device_info browser_info is_active');
  } catch (err) {
    next(err);
  }
  if (found) {
    return otherHelper.sendResponse(res, httpStatus.OK, true, found, null, 'Logged out', null);
  } else {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Invalid Data', null);
  }
};

module.exports = { internal, loginlogController };
