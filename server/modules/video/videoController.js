const httpStatus = require('http-status');
const objectId = require('mongoose').Types.ObjectId;
const videoSch = require('./videoSchema');
const videoConfig = require('./videoConfig');
const otherHelper = require('../../helper/others.helper');
const videoController = {};

videoController.GetVideo = async (req, res, next) => {
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

    selectq = 'video_library code videos added_by added_at';

    searchq = {
      is_deleted: false,
    };

    if (req.query.find_video_library) {
      searchq = {
        video_library: { $regex: req.query.find_video_library, $options: 'i x' },
        ...searchq,
      };
    }
    if (req.query.find_added_at) {
      searchq = {
        added_at: { $regex: req.query.find_added_at, $options: 'i x' },
        ...searchq,
      };
    }
    let videos = await otherHelper.getquerySendResponse(videoSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, videos.data, videoConfig.get, page, size, videos.totaldata);
  } catch (err) {
    next(err);
  }
};

videoController.GetVideoForUser = async (req, res, next) => {
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

    selectq = 'video_library code videos added_at';

    searchq = {
      is_deleted: false,
    };

    if (req.query.find_video_library) {
      searchq = {
        video_library: { $regex: req.query.find_video_library, $options: 'i x' },
        ...searchq,
      };
    }
    if (req.query.find_added_at) {
      searchq = {
        added_at: { $regex: req.query.find_added_at, $options: 'i x' },
        ...searchq,
      };
    }
    let videos = await otherHelper.getquerySendResponse(videoSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, videos.data, videoConfig.get, page, size, videos.totaldata);
  } catch (err) {
    next(err);
  }
};

videoController.PostVideo = async (req, res, next) => {
  try {
    const video = req.body;
    if (video && video._id) {
      const update = await videoSch.findByIdAndUpdate(video._id, {
        $set: video,
      });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, videoConfig.save, null);
    } else {
      video.added_by = req.user.id;
      const newvideo = new videoSch(video);
      const videosave = await newvideo.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, videosave, null, videoConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
videoController.GetVideoById = async (req, res, next) => {
  const id = req.params.id;
  const video = await videoSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, video, null, videoConfig.get, null);
};

videoController.GetVideoDetailById = async (req, res, next) => {
  const id = req.params.id;
  const videoDetail = await videoSch.findOne({ 'videos._id': id }).select('video_library code added_by added_at videos.title videos.url videos._id');
  return otherHelper.sendResponse(res, httpStatus.OK, true, videoDetail, null, videoConfig.get, null);
};

videoController.GetVideoDetailByIdForUser = async (req, res, next) => {
  const id = req.params.id;
  const videoDetail = await videoSch.findOne({ 'videos._id': id, is_deleted: false }).select('video_library code videos.title videos.url videos._id');
  return otherHelper.sendResponse(res, httpStatus.OK, true, videoDetail, null, videoConfig.get, null);
};

videoController.DeleteVideo = async (req, res, next) => {
  const id = req.params.id;
  const video = await videoSch.findByIdAndUpdate(objectId(id), { $set: { is_deleted: true } });
  return otherHelper.sendResponse(res, httpStatus.OK, true, video, null, videoConfig.delete, null);
};

module.exports = videoController;
