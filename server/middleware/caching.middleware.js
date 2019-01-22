'use strict';
const cache = require('memory-cache');
const otherHelper = require('../helper/others.helper');
const cacheMiddleware = {};
const interanl = {};
interanl.generatekey = req => {
  return `${req.baseUrl}${req.url}`;
};
cacheMiddleware.SetCache = (req, value) => {
  cache.put(interanl.generatekey(req), value);
};
cacheMiddleware.DeleteCache = req => {
  cache.del(interanl.generatekey(req));
};
cacheMiddleware.FlushAll = () => {
  cache.clear();
};
cacheMiddleware.GetCache = (req, res, next) => {
  const data = cache.get(interanl.generatekey(req));
  if (data) {
    return otherHelper.sendResponseFromCache(req, res, next, data);
  } else {
    next();
  }
};

module.exports = cacheMiddleware;
