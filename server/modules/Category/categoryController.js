const HttpStatus = require('http-status');
const ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const CatSch = require('./category');
const categotyController = {};
const internal = {};

categotyController.GetCategory = async (req, res, next) => {
  const categotys = await CatSch.find({ IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, categotys, null, 'Category Get Success !!', null);
};
categotyController.SaveCategory = async (req, res, next) => {
  try {
    const categoty = req.body;
    if (categoty._id) {
      if (req.files && req.files[0]) {
        categoty.CategoryImage = req.files[0];
      }
      console.log(categoty);
      const update = await CatSch.findByIdAndUpdate(ObjectId(categoty._id), { $set: categoty });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Category Saved Success !!', null);
    } else {
      categoty.CategoryImage = req.files[0];
      categoty.Added_by = req.user.id;
      categoty.slug = 'req.user.id';
      const newCat = new CatSch(categoty);
      const categotySave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, categotySave, null, 'Category Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
categotyController.GetCategoryDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const categoty = await CatSch.findOne({ slug: slug, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, categoty, null, 'Category Get Success !!', null);
};
categotyController.GetCategoryDetailByID = async (req, res, next) => {
  const id = req.params.id;
  const categoty = await CatSch.findOne({ _id: ObjectId(id) });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, categoty, null, 'Category Get Success !!', null);
};

categotyController.DeleteCategory = async (req, res, next) => {
  const id = req.params.id;
  const result = await CatSch.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });

  return otherHelper.sendResponse(res, HttpStatus.OK, true, result, null, 'Organization Deleted !!', null);
};

module.exports = categotyController;
