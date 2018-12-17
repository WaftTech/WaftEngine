const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const wordpressSch = require('./wordpress');
const wordpressController = {};
const internal = {};

wordpressController.GetContent = async (req, res, next) => {
  const wordpress_schema = await wordpressSch.find({ IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, wordpress_schema, null, 'Success !!', null);
  };
wordpressController.SaveContent = async (req, res, next) => {
  try {
    const wordpress = req.body;
    console.log('wordpress', wordpress);
    if (wordpress && wordpress._id) {
      if (req.files && req.files[0]) {
        wordpress.wordpressImage = req.files[0];
      }
      const update = await wordpressSch.findByIdAndUpdate(wordpress._id, { $set: wordpress });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Saved Success !!', null);
    } else {
      wordpress.wordpressImage = req.files && req.files[0];
      //wordpress.Added_by = req.user.id;
      const newCat = new wordpressSch(wordpress);
      const wordpressSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, wordpressSave, null, 'Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
wordpressController.GetContentDetail = async (req, res, next) => {
  const id = req.params.id;
  const wordpress = await wordpressSch.findOne({ _id: ObjectId(id), IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, wordpress, null, 'Get Success !!', null);
};
wordpressController.Deletewordpress = async (req, res, next) => {
  const id = req.params.id;
  const wordpress = await wordpressSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true} });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, wordpress, null, 'Get Success !!', null);
};


module.exports = wordpressController;