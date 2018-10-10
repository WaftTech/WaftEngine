const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const AdsSch = require('./ads');
const adsController = {};
const internal = {};

adsController.GetAds = async (req, res, next) => {
  const adss = await AdsSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, adss, null, 'Ads Get Success !!', null);
};
adsController.SaveAds = async (req, res, next) => {
  try {
    const ads = req.body;
    if (ads._id) {
      if (req.files && req.files[0]) {
        ads.AdsImage = req.files[0];
      }
      const update = await AdsSch.findByIdAndUpdate(ads._id, { $set: ads });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Ads Saved Success !!', null);
    } else {
      ads.AdsImage = req.files[0];
      ads.Added_by = req.user.id;
      const newCat = new AdsSch(ads);
      const adsSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, adsSave, null, 'Ads Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
adsController.GetAdsDetail = async (req, res, next) => {
  const id = req.params.id;
  const ads = await AdsSch.findOne({ _id: ObjectId(id), IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, ads, null, 'Ads Get Success !!', null);
};

module.exports = adsController;
