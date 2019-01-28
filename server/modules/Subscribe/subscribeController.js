const HttpStatus = require('http-status');
const ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const subscribeConfig = require('./subscribeConfig');
const SubscribeSch = require('./subscribe');
const subscribeController = {};

subscribeController.GetSubscribes = async (req, res, next) => {
  let page;
  let size;
  let searchq;
  let sortquery;
  let selectq;
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

  if (req.query.sort) {
    let sortField = req.query.sort.slice(1);
    let sortBy = req.query.sort.charAt(0);
    if (sortBy == 1 && !isNaN(sortBy)) {
      // 1 is for ascending
      sortquery = sortField;
    } else if (sortBy == 0 && !isNaN(sortBy)) {
      //0 is for descending
      sortquery = '-' + sortField;
    } else {
      sortquery = '';
    }
  }
  if (req.query.find_email) {
    searchq = { email: { $regex: req.query.find_email, $options: 'i x' }, ...searchq };
  }
  selectq = 'email added_at';
  let subscribeData = await otherHelper.getquerySendResponse(SubscribeSch, page, size, sortquery, searchq, selectq, '', next);
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, subscribeData.data, subscribeConfig.get, page, size, subscribeData.totaldata);
};
subscribeController.GetSubscribeById = async (req, res, next) => {
  const id = req.params.id;
  const subscriber = await SubscribeSch.findOne({ _id: id }, { __v: 0 });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, subscriber, null, subscribeConfig.get, null);
};
subscribeController.SaveSubscribe = async (req, res, next) => {
  const data = req.body;
  const subscribed = await SubscribeSch.findOne({ email: data.email });
  if (subscribed) {
    const errors = subscribeConfig.alreadySaved;
    return otherHelper.sendResponse(res, HttpStatus.NOT_ACCEPTABLE, false, null, errors, subscribeConfig.alreadySaved, null);
  } else {
    const newSubscribe = new SubscribeSch(data);
    const saveSubscribe = await newSubscribe.save();
    return otherHelper.sendResponse(res, HttpStatus.OK, true, saveSubscribe, null, subscribeConfig.save, null);
  }
};
module.exports = subscribeController;
