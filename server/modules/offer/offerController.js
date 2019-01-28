const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const { SetCache, FlushAll } = require('../../middleware/caching.middleware');
const offerconfig = require('./offerconfig');
const OfferSch = require('./offer');
const OfferController = {};

OfferController.GetOffer = async (req, res, next) => {
  let page;
  let size;
  let searchq;
  let sortquery;
  let selectq;
  let populate;
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
  searchq = { IsDeleted: false };
  if (req.query.find_Offer_In) {
    searchq = { Offer_In: { $regex: req.query.find_Offer_In, $options: 'i x' }, ...searchq };
  }
  selectq = ('Offer_In Company', { IsDeleted: false });
  populate = { path: 'Company', select: 'Name' };
  let offerdata = await otherHelper.getquerySendResponse(OfferSch, page, size, sortquery, searchq, selectq, populate, next);
  SetCache(req, { ...offerdata, msg: offerconfig.getOffer, page, size, success: true });
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, offerdata.data, offerconfig.getOffer, page, size, offerdata.totaldata);
};
OfferController.GetCompanyOffer = async (req, res, next) => {
  let page;
  let size;
  let searchq;
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
  const id = req.params.id;
  searchq = { IsDeleted: false, IsActive: true, Company: id };
  const companyOffer = await OfferSch.find({ IsDeleted: false, IsActive: true, Company: id });
  const totaldata = await OfferSch.countDocuments(searchq);
  SetCache(req, { data: companyOffer, msg: offerconfig.getOffer, page, page, success: true, totaldata, size });
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, companyOffer, offerconfig.getOffer, page, size, totaldata);
};
OfferController.GetOfferDetailBySlug = async (req, res, next) => {
  let slugURL = req.params.slug;
  const offer = await OfferSch.findOne({ SlugURL: slugURL }, { __v: 0 }).populate({ path: 'Company', select: 'Name' });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, offer, null, 'Here is the offer!!', null);
};
OfferController.SaveOffer = async (req, res, next) => {
  try {
    let Offers = req.body;
    let d = new Date();
    FlushAll();
    Offers.SlugURL = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${Offers.Offer_In}`);
    if (Offers && Offers._id) {
      if (req.file) {
        Offers.Image = req.file;
      }
      const update = await OfferSch.findByIdAndUpdate(Offers._id, { $set: Offers });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, offerconfig.saveOffer, null);
    } else {
      if (req.file) {
        Offers.Image = req.file;
      }
      const newOffers = new OfferSch(Offers);
      const OfferSave = await newOffers.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, OfferSave, null, offerconfig.saveOffer, null);
    }
  } catch (err) {
    next(err);
  }
};
OfferController.DeleteOffer = async (req, res, next) => {
  const id = req.params.id;
  const Offer = await OfferSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_at: new Date() } });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, Offer, null, offerconfig.deleteOffer, null);
};
module.exports = OfferController;
