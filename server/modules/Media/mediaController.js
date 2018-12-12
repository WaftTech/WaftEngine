const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const MediaSch = require('./media');
const mediaController = {};
const internal = {};

mediaController.GetMedia = async (req, res, next) => {
  const page = parseInt(req.params.page);
  const medias = await MediaSch.find({ IsDeleted: false })
    .limit(12)
    .skip(12 * page)
    .sort({ _id: -1 })
    .select('_id path fieldname originalname mimetype');
  return otherHelper.sendResponse(res, HttpStatus.OK, true, medias, null, 'Media Get Success !!', null);
};
mediaController.SaveMedia = async (req, res, next) => {
  try {
    let media = req.body;
    if (media._id) {
      if (req.files && req.files[0]) {
        media = req.files[0];
      }
      const update = await MediaSch.findByIdAndUpdate(media._id, { $set: media });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Media Saved Success !!', null);
    } else {
      media = req.files[0];
      media.Added_by = req.user.id;
      media.type = req.params.type;
      const newMedia = new MediaSch(media);
      const mediaSave = await newMedia.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, mediaSave, null, 'Media Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
mediaController.GetMediaDetail = async (req, res, next) => {
  const id = req.params.id;
  const media = await MediaSch.findOne({ _id: ObjectId(id), IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, media, null, 'Media Get Success !!', null);
};
mediaController.DeleteMedia = async (req, res, next) => {
  const id = req.params.id;
  const media = await MediaSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, media, null, 'Media Delete Success !!', null);
};

module.exports = mediaController;
