const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const subscribeSch = require('./subscribeSchema');
const subscribeController = {};

subscribeController.GetSubscribe = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let searchq;
    let populate;
    let selectq;
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
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortq = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortq = '-' + sortfield;
      } else {
        sortq = '';
      }
    }
    populate = '';
    selectq = 'email is_subscribed added_at';
    searchq = {
      is_subscribed: true,
    };
    if (req.query.find_email) {
      searchq = {
        email: {
          $regex: req.query.find_email,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let subscriber = await otherHelper.getquerySendResponse(subscribeSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, subscriber.data, 'subscriber get successful!!', page, size, subscriber.totaldata);
  } catch (err) {
    next(err);
  }
};
subscribeController.SaveSubscribe = async (req, res, next) => {
  try {
    let subscriber = req.body;
    subscriber.is_subscribed = true;
    const newSubscribe = new subscribeSch(subscriber);
    const subscriberSave = await newSubscribe.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriberSave, null, 'subscriber save successful!!', null);
  } catch (err) {
    next(err);
  }
};
subscribeController.GetSubscribeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subscriber = await subscribeSch.findOne({ _id: id, is_subscribed: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, subscriber, null, 'subscriber detail get successful!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = subscribeController;
