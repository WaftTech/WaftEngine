const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const socialMediaConfig = require('./socialMediaConfig');
const socialMediaSchema = require('./socialMediaSchema');

const socialMediaController = {};

socialMediaController.getSocialMedias = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { ...searchQuery, is_deleted: false };
    let data = await otherHelper.getQuerySendResponse(socialMediaSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, socialMediaConfig.mediaGet, page, size, data.totalData, sortQuery);
  } catch (err) {
    next(err);
  }
};

socialMediaController.getSocialMediasForPublic = async (req, res, next) => {
  try {
    let { page, size, sortQuery, searchQuery, selectQuery, populate } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { ...searchQuery, is_deleted: false, is_active: true };
    let data = await otherHelper.getQuerySendResponse(socialMediaSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, data.data, socialMediaConfig.mediaGet, page, size, data.totalData, sortQuery);
  } catch (err) {
    next(err);
  }
};

socialMediaController.getSocialMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await socialMediaSchema.findById({ _id: id, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, socialMediaConfig.mediaGet, null);
  } catch (err) {
    next(err);
  }
};

socialMediaController.postSocialMedia = async (req, res, next) => {
  try {
    const socialMedia = req.body;
    if (socialMedia && socialMedia._id) {
      let ifExists = await socialMediaSchema.find({ _id: { $nin: [socialMedia._id] }, is_deleted: false, $or: [{ title: socialMedia.title }, { order: socialMedia.order }] });
      if (ifExists.length > 0) {
        error = { titleOrOrder: 'Oops!!!Name already exists or this order is taken.' };
        return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
      }
      const update = await socialMediaSchema.findByIdAndUpdate({ _id: socialMedia._id }, { $set: socialMedia }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, socialMediaConfig.mediaSave, null);
    } else {
      let ifExists = await socialMediaSchema.find({ is_deleted: false, $or: [{ title: socialMedia.title }, { order: socialMedia.order }] });

      if (ifExists.length > 0) {
        error = { titleOrOrder: 'Oops!!!Name already exists or this order is taken.' };
        return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, null, error, null, null);
      }
      const newSocialMedia = new socialMediaSchema(socialMedia);
      const saveMedia = await newSocialMedia.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saveMedia, null, socialMediaConfig.mediaSave, null);
    }
  } catch (err) {
    next(err);
  }
};

socialMediaController.deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    await socialMediaSchema.findByIdAndUpdate({ _id: id }, { $set: { is_deleted: true } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { id }, null, socialMediaConfig.deleteMedia, null);
  } catch (err) {
    next(err);
  }
};

module.exports = socialMediaController;
