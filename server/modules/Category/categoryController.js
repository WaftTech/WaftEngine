const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const CatSch = require('./category');
const categotyController = {};
const internal = {};

categotyController.GetCategory = async (req, res, next) => {
  const categotys = await CatSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, categotys, null, 'Category Get Success !!', null);
};
categotyController.SaveCategory = async (req, res, next) => {
  try {
    const categoty = req.body;
    console.log(req.files);
    if (categoty._id) {
      if (req.files && req.files[0]) {
        categoty.CategoryImage = req.files[0];
      }
      const update = await CatSch.findByIdAndUpdate(categoty._id, { $set: categoty });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Category Saved Success !!', null);
    } else {
      categoty.CategoryImage = req.files[0];
      const newCat = new CatSch(categoty);
      newCat.slug = newCat.Category;
      const categotySave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, categotySave, null, 'Category Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
categotyController.GetCategoryDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const categoty = await CatSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, categoty, null, 'Category Get Success !!', null);
};

module.exports = categotyController;
