const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const contentSch = require('./contentShema');
const contentConfig = require('./contentConfig');
const contentController = {};
const internal = {};

contentController.GetContent = async (req, res, next) => {
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
    console.log(sortfield);
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
  let datas = await otherHelper.getquerySendResponse(contentSch, page, size, sortq, searchq, selectq, next, '');

  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, contentConfig.gets, page, size, datas.totaldata);
};
contentController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    console.log('contents', contents);
    if (contents && contents._id) {
      const update = await contentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, contentConfig.save, null);
    } else {
      contents.Added_by = req.user.id;
      const newContent = new contentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, contentsSave, null, contentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
contentController.GetContentDetail = async (req, res, next) => {
  const id = req.params.id;
  const contents = await contentSch.findOne({ _id: id, IsDeleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, contents, null, contentConfig.get, null);
};

module.exports = contentController;
