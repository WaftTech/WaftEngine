const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const ContentSch = require('./content');
const contentsController = {};
const internal = {};

contentsController.GetContent = async (req, res, next) => {
  const contentss = await ContentSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contentss, null, 'Content Get Success !!', null);
};
contentsController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    console.log('contents', contents);
    if (contents && contents._id) {
      const update = await ContentSch.findByIdAndUpdate(contents._id, { $set: contents });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Content Saved Success !!', null);
    } else {
      contents.Added_by = req.user.id;
      // contents.ContentHistory = contents.Push({ Description: contents.Description, Time: Date.Now });
      const newContent = new ContentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, contentsSave, null, 'Content Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
contentsController.GetContentDetail = async (req, res, next) => {
  const id = req.params.id;
  const contents = await ContentSch.findOne({ _id: id, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, 'Content Get Success !!', null);
};

module.exports = contentsController;
