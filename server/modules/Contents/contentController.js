const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const ContentSch = require('./content');
const ContentConfig = require('./ContentConfig');
const contentsController = {};
const internal = {};

contentsController.GetContent = async (req, res, next) => {
  const contentss = await ContentSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contentss, null, ContentConfig.ValidationMessage.GetContent, null);
};
contentsController.SaveContent = async (req, res, next) => {
  try {
    const contents = req.body;
    console.log('contents', contents);
    if (contents && contents._id) {
      const update = await ContentSch.findByIdAndUpdate(contents._id, { $set: contents }, { new: true });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, ContentConfig.ValidationMessage.SaveContent, null);
    } else {
      contents.Added_by = req.user.id;
      // contents.ContentHistory = contents.Push({ Description: contents.Description, Time: Date.Now });
      const newContent = new ContentSch(contents);
      const contentsSave = await newContent.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, contentsSave, null, ContentConfig.ValidationMessage.SaveContent, null);
    }
  } catch (err) {
    next(err);
  }
};
contentsController.GetContentDetail = async (req, res, next) => {
  const id = req.params.id;
  const contents = await ContentSch.findOne({ _id: id, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, ContentConfig.ValidationMessage.GetContent, null);
};

module.exports = contentsController;
