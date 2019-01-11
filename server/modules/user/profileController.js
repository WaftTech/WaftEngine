const User = require('./userShema');
const Subscriber = require('./subscribeSchema');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
// Load Input Validation
const { validateUserScanInput, validateRegisterInput, validateLoginInput } = require('./userValidations');
const emailTemplate = require('../../helper/email-render-template');
const auth = require('../../helper/auth.helper');
const thirdPartyApiRequesterHelper = require('../../helper/apicall.helper');
const otherHelper = require('../../helper/others.helper');
const { secretOrKey, oauthConfig, tokenExpireTime } = require('../../config/keys');
const mailSender = require('./userMail');
const travellSch = require('../Home/Traveller');
const tripSch = require('../Trip/tripSchema');

const profileController = {};
profileController.getBio = async (req, res, next) => {
  try {
    const d = await User.findById(req.user.id, { bio: 1, _id: 0 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, d, null, 'Bio get Success', null, null);
  } catch (err) {
    next(err);
  }
};
profileController.updateBio = async (req, res, next) => {
  try {
    const d = await User.findByIdAndUpdate(req.user.id, { $set: { bio: req.body.bio } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { bio: req.body.bio }, null, 'Bio Saved Success', null, null);
  } catch (err) {
    next(err);
  }
};

profileController.getSkill = async (req, res, next) => {
  try {
    const d = await User.findById(req.user.id, { skills: 1, _id: 0 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, d, null, 'Skills get Success', null, null);
  } catch (err) {
    next(err);
  }
};
profileController.updateSkill = async (req, res, next) => {
  try {
    const d = await User.findByIdAndUpdate(req.user.id, { $set: { skills: req.body.skills } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { skills: req.body.skills }, null, 'Skills Saved Success', null, null);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
profileController.getDescribe = async (req, res, next) => {
  try {
    const d = await User.findById(req.user.id, { description: 1, _id: 0 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, d, null, 'Description get Success', null, null);
  } catch (err) {
    next(err);
  }
};
profileController.updateDescribe = async (req, res, next) => {
  try {
    const d = await User.findByIdAndUpdate(req.user.id, { $set: { description: req.body.description } });
    console.log(d);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { description: req.body.description }, null, 'Description Saved Success', null, null);
  } catch (err) {
    next(err);
  }
};

profileController.getSubscribed = async (req, res, next) => {
  try {
    const d = await Subscriber.find({ SubscriberId: req.user.id, IsActive: true });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, d, null, 'Subscriber get Success', null, null);
  } catch (err) {
    next(err);
  }
};
profileController.getSubscribedForProfile = async (req, res, next) => {
  try {
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
        sortquery = sortField;
      } else if (sortBy == 0 && !isNaN(sortBy)) {
        sortquery = '-' + sortField;
      } else {
        sortquery = '';
      }
    }
    searchq = { SubscriberId: req.user.id, IsActive: true };
    sortquery = { _id: 1 };

    const populate = [{ path: 'UserId', select: { name: 1, email: 1, avatar: 1 } }, { path: 'CompanyId', select: { Company: 1, Address: 1, Image: 1 } }];
    selectq = '';
    const data = await otherHelper.getquerySendResponse(Subscriber, page, size, sortquery, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, data && data.data, 'Data Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};
profileController.postSubscribed = async (req, res, next) => {
  try {
    const subscribe = req.body;
    if (subscribe._id) {
      const update = await Subscriber.findByIdAndUpdate(subscribe._id, { $set: subscribe }, { new: true });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Subscribe!!', null);
    } else {
      subscribe.SubscriberId = req.user.id;
      console.log(subscribe);
      const newSubscribe = new Subscriber(subscribe);
      await newSubscribe.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newSubscribe, null, 'Subscribed!!', null);
    }
  } catch (err) {
    next(err);
  }
};
profileController.getCompany = async (req, res, next) => {
  try {
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
    searchq = { IsDeleted: false, CompanyUser: req.user.id };
    sortquery = { _id: 1 };

    const populate = '';
    selectq = 'Company Address Image AddedBy IsActive';
    const data = await otherHelper.getquerySendResponse(CompanySch, page, size, sortquery, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, data && data.data, 'Data Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};
profileController.getJoinedTrip = async (req, res, next) => {
  try {
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
    searchq = {};
    sortquery = { _id: -1 };

    const populate = [
      { path: 'UserID', select: { name: 1, email: 1, avatar: 1 } },
      { path: 'TripID', populate: { path: 'Images', select: { originalname: 1, filename: 1 } }, select: { CostCurrency: 1, Title: 1, Images: 1, StartDate: 1, EndDate: 1, Cost: 1, FromLocation: 1, ToLocation: 1, MaxTravels: 1 } },
    ];
    selectq = '';
    const data = await otherHelper.getquerySendResponse(travellSch, page, size, sortquery, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, data && data.data, 'Data Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};
profileController.getOfferTrip = async (req, res, next) => {
  try {
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
    searchq = { AddedBy: req.user.id };
    sortquery = { _id: -1 };

    const populate = [{ path: 'Images', select: { originalname: 1, filename: 1 } }];
    selectq = '';
    const data = await otherHelper.getquerySendResponse(tripSch, page, size, sortquery, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, data && data.data, 'Data Get Success', page, size, data && data.totaldata);
  } catch (err) {
    next(err);
  }
};

module.exports = profileController;
