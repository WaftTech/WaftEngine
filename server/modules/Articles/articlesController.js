const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const ArticleSch = require('./articles');
const articleController = {};
const internal = {};

articleController.GetArticle = async (req, res, next) => {
  const articles = await ArticleSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, articles, null, 'Article Get Success !!', null);
};
articleController.SaveArticle = async (req, res, next) => {
  try {
    const article = req.body;
    if (article._id) {
      if (req.files && req.files[0]) {
        article.ArticleImage = req.files[0];
      }
      const update = await ArticleSch.findByIdAndUpdate(article._id, { $set: article });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Article Saved Success !!', null);
    } else {
      article.ArticleImage = req.files[0];
      article.Added_by = req.user.id;
      const newCat = new ArticleSch(article);
      const articleSave = await newCat.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, articleSave, null, 'Article Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
articleController.GetArticleDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const article = await ArticleSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, article, null, 'Article Get Success !!', null);
};

module.exports = articleController;
