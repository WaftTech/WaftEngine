const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const CatSch = require('./link');
const linkController = {};
const internal = {};

linkController.GetLink = async (req, res, next) => {
  const link = await CatSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, link, null, 'Link Get Success !!', null);
};
linkController.SaveLink = async (req, res, next) => {
  try {
    const link = req.body;
    console.log(req.files);
    if (link._id) {
      const update = await CatSch.findByIdAndUpdate(link._id, { $set: link });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Link Saved Success !!', null);
    } else {
      const newCat = new CatSch(link);
      newCat.slug = newCat.Link;
      const linkSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, linkSave, null, 'Link Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
linkController.GetLinkDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const link = await CatSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, link, null, 'Link Get Success !!', null);
};

module.exports = linkController;
