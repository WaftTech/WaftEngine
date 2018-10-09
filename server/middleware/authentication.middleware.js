'use strict';
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');

const otherHelper = require('../helper/others.helper');
const { secretOrKey } = require('../config/keys');
const authMiddleware = {};

authMiddleware.authorization = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    console.log(token);
    if (token) {
      const d = await jwt.verify(token, secretOrKey);
      console.log('+++++++++++++++++++++++++++++++++');
      console.log(d);
      req.user = d;
      return next();
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'token not found', null);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
module.exports = authMiddleware;
