const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const NewsSch = require('./news');
const newsController = {};
const internal = {};

newsController.GetNews = async (req, res, next) => {
  const news = await NewsSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, news, null, 'News Get Success !!', null);
};
newsController.SaveNews = async (req, res, next) => {
  try {
    const news = req.body;
    console.log(req.files);
    if (news._id) {
      if (req.files && req.files[0]) {
        news.NewsImage = req.files[0];
      }
      const update = await NewsSch.findByIdAndUpdate(news._id, { $set: news });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'News Saved Success !!', null);
    } else {
      news.NewsImage = req.files[0];
      const newCat = new NewsSch(news);
      newCat.slug = newCat.News;
      const newsSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newsSave, null, 'News Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
newsController.GetNewsDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const news = await NewsSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, news, null, 'News Get Success !!', null);
};

module.exports = newsController;
