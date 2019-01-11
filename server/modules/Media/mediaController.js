const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const mediaSch = require('./media');
const mediaController = {};
const internal = {};

mediaController.GetMedia = async (req, res, next) => {
  const page = parseInt(req.params.page);
  const medias = await mediaSch
    .find({ IsDeleted: false })
    .limit(12)
    .skip(12 * page)
    .sort({ _id: -1 })
    .select('_id path fieldname originalname mimetype');
  return otherHelper.sendResponse(res, httpStatus.OK, true, medias, null, 'Media Get Success !!', null);
};
mediaController.SaveMedia = async (req, res, next) => {
  try {
    let media = req.body;
    if (media._id) {
      if (req.files && req.files[0]) {
        media = req.files[0];
      }
      const update = await mediaSch.findByIdAndUpdate(media._id, { $set: media }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Media Saved Success !!', null);
    } else {
      media = req.files[0];
      media.Added_by = req.user.id;
      media.type = req.params.type;
      const newMedia = new mediaSch(media);
      const mediaSave = await newMedia.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, mediaSave, null, 'Media Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
mediaController.GetMediaDetail = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findOne({ _id: objectId(id), IsDeleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Get Success !!', null);
};
mediaController.DeleteMedia = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findByIdAndUpdate(
    objectId(id),
    {
      $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Delete Success !!', null);
};

module.exports = mediaController;
