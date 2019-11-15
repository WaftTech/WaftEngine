const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const mediaSch = require('./mediaSchema');
const mediaController = {};

mediaController.GetMediaPagination = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let searchq;
    let populate;
    let selectq;
    if (req.query.page && req.query.page == 0) {
      const media = await mediaSch.find({ is_deleted: false });
      return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'all media success!!', null);
    }
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
    selectq = 'field_name type destination path field_name original_name mimetype size encoding added_at module';

    searchq = { is_deleted: false };
    populate = { path: 'added_by' };
    let media = await otherHelper.getquerySendResponse(mediaSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, media.data, 'media get success!!', page, size, media.totaldata);
  } catch (err) {
    next(err);
  }
};
mediaController.GetMedia = async (req, res, next) => {
  const page = parseInt(req.params.page);
  const medias = await mediaSch
    .find({ is_deleted: false })
    .limit(12)
    .skip(12 * page)
    .sort({ _id: -1 })
    .select('_id path field_name original_name mimetype size encoding');
  return otherHelper.sendResponse(res, httpStatus.OK, true, medias, null, 'Media Get Success !!', null);
};
mediaController.SaveMedia = async (req, res, next) => {
  try {
    let media = req.body;
    if (media._id) {
      if (req.file && req.file) {
        media = req.file;
      }
      const update = await mediaSch.findByIdAndUpdate(media._id, { $set: media }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Media Saved Success !!', null);
    } else {
      media = req.file;
      media.added_by = req.user.id;
      media.destination =
        media.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      media.path = media.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      media.type = req.params.type;
      media.added_by = req.user.id;
      const newMedia = new mediaSch(media);
      const mediaSave = await newMedia.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, mediaSave, null, 'Media Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};

mediaController.SaveMultipleMedia = async (req, res, next) => {
  try {
    let medias = [];
    for (let i = 0; i < req.files.length; i++) {
      let media = req.files[i];
      media.added_by = req.user.id;
      media.destination =
        media.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      media.path = media.path
        .split('\\')
        .join('/')
        .split('server/')[1];
      media.type = req.params.type;
      const newMedia = new mediaSch(media);
      const mediaSave = await newMedia.save();
      medias.push(mediaSave);
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, medias, null, 'Media Saved Success !!', null);
  } catch (err) {
    next(err);
  }
};
mediaController.GetMediaDetail = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findOne({ _id: objectId(id), is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Get Success !!', null);
};
mediaController.DeleteMedia = async (req, res, next) => {
  const id = req.params.id;
  const media = await mediaSch.findByIdAndUpdate(
    objectId(id),
    {
      $set: { is_deleted: true, deleted_by: req.user.id, deleted_at: new Date() },
    },
    { new: true },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, media, null, 'Media Delete Success !!', null);
};
mediaController.UploadFromCkEditor = async (req, res, next) => {
  try {
    console.log(req.files);

    // media.destination =
    //   media.destination
    //     .split('\\')
    //     .join('/')
    //     .split('server/')[1] + '/';
    // media.path = media.path
    //   .split('\\')
    //   .join('/')
    //   .split('server/')[1];
    let html = '';
    html += `<script type='text/javascript'>
    var funcNum = ${req.query.CKEditorFuncNum};
    var url = "http://localhost:5051/public/media/${req.files[0].filename}";
    var message = "Uploaded file successfully";
   window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);
    </script>`;

    res.send(html);
  } catch (err) {
    next(err);
  }
};
module.exports = mediaController;
