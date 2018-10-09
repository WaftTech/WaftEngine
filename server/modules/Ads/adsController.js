const HttpStatus = require('http-status');
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
    console.log(req.files);
    if (ads._id) {
      if (req.files && req.files[0]) {
        ads.AdsImage = req.files[0];
      }
      const update = await AdsSch.findByIdAndUpdate(ads._id, { $set: ads });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Ads Saved Success !!', null);
    } else {
      ads.AdsImage = req.files[0];
      const newCat = new AdsSch(ads);
      newCat.slug = newCat.Ads;
      const adsSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, adsSave, null, 'Ads Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
adsController.GetAdsDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const ads = await AdsSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, ads, null, 'Ads Get Success !!', null);
};

module.exports = adsController;
