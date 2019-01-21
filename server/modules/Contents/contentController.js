const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const ContentSch = require('./content');
const config = require('./contentConfig');
const contentsController = {};
const internal = {};

contentsController.GetContent = async (req, res, next) => {
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

  searchq = { IsDeleted: false };

  if (req.query.find_ContentName) {
    searchq = { ContentName: { $regex: req.query.find_ContentName, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_Key) {
    searchq = { Key: { $regex: req.query.find_Key, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_PublishFrom) {
    searchq = { PublishFrom: { $regex: req.query.find_PublishFrom, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_PublishTo) {
    searchq = { PublishTo: { $regex: req.query.find_PublishTo, $options: 'i x' }, ...searchq };
  }
  selectq = 'ContentName Key Description PublishFrom PublishTo IsActive IsFeature';
  let datas = await otherHelper.getquerySendResponse(ContentSch, page, size, sortq, searchq, selectq, '', next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, config.gets, page, size, datas.totaldata);
};
contentsController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    if (contents && contents._id) {
      const update = await ContentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, config.save, null);
    } else {
      contents.Added_by = req.user.id;
      const newContent = new ContentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, contentsSave, null, config.save, null);
    }
  } catch (err) {
    next(err);
  }
};
contentsController.GetContentDetail = async (req, res, next) => {
  const id = req.params.id;
  const contents = await ContentSch.findOne({ _id: id, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, config.get, null);
};
contentsController.GetContentByKey = async (req, res, next) => {
  const Key = req.params.key;
  const contents = await ContentSch.findOne({ Key, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, config.get, null);
};

module.exports = contentsController;
