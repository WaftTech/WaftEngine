const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const contentSch = require('./contentShema');
const contentConfig = require('./contentConfig');
const contentController = {};
const internal = {};

contentController.GetContent = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchq;
    let sortq;
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

    searchq = { is_deleted: false };

    if (req.query.find_name) {
      searchq = { name: { $regex: req.query.find_name, $options: 'i' }, ...searchq };
    }
    if (req.query.find_key) {
      searchq = { key: { $regex: req.query.find_key, $options: 'i' }, ...searchq };
    }
    if (req.query.find_publish_from) {
      searchq = { publish_from: { $regex: req.query.find_publish_from, $options: 'i' }, ...searchq };
    }
    if (req.query.find_publish_to) {
      searchq = { publish_to: { $regex: req.query.find_publish_to, $options: 'i' }, ...searchq };
    }
    selectq = 'name key description publish_from publish_to is_active is_feature is_deleted';
    let datas = await otherHelper.getquerySendResponse(contentSch, page, size, sortq, searchq, selectq, next, '');

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, contentConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
contentController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    if (contents && contents._id) {
      const update = await contentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, contentConfig.save, null);
    } else {
      contents.added_by = req.user.id;
      const newContent = new contentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, contentsSave, null, contentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
contentController.GetContentDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contents = await contentSch.findOne({ _id: id, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.GetContentByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const contents = await contentSch.findOne({ key, is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
  } catch (err) {
    next(err);
  }
};
contentController.DeleteContent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await contentSch.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'content delete success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = contentController;
