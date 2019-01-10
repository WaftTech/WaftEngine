const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const blogConfig = require('./blogConfig');
const BlogSch = require('./blog');
const blogcontroller = {};

blogcontroller.GetBlogAuthorize = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let searchq;
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
    selectq = 'Title Description Summary Tags Keywords SlugUrl IsPublished PublishedOn IsActive Image Added_by Added_at Updated_at Updated_by';
    searchq = { IsDeleted: false };
    if (req.query.find_Title) {
      searchq = { Title: { $regex: req.query.find_Title, $options: 'i x' }, ...searchq };
    }
    if (req.query.find_PublishedOn) {
      searchq = { PublishedOn: { $regex: req.query.find_PublishedOn, $options: 'i x' }, ...searchq };
    }
    let blogs = await otherHelper.getquerySendResponse(BlogSch, page, size, sortq, searchq, selectq, '', next);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogUnauthorize = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let searchq;
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
    selectq = 'Title Description Summary Tags Keywords SlugUrl PublishedOn IsActive Image Added_by Added_at Updated_at Updated_by';
    searchq = { IsDeleted: false };
    searchq = { IsPublished: true, ...searchq };
    if (req.query.find_Title) {
      searchq = { Title: { $regex: req.query.find_Title, $options: 'i x' }, ...searchq };
    }
    if (req.query.find_PublishedOn) {
      searchq = { PublishedOn: { $regex: req.query.find_PublishedOn, $options: 'i x' }, ...searchq };
    }
    let blogs = await otherHelper.getquerySendResponse(BlogSch, page, size, sortq, searchq, selectq, '', next);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    let d = new Date();
    blogs.SlugUrl = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogs.Title}`);
    if (blogs && blogs._id) {
      if (req.files && req.files[0]) {
        blogs.Image = req.files;
      }
      const update = await BlogSch.findByIdAndUpdate(blogs._id, { $set: blogs });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, blogConfig.save, null);
    } else {
      blogs.Image = req.files;
      const newBlog = new BlogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, BlogSave, null, blogConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findOne({ _id: id, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, blogConfig.get, null);
};
blogcontroller.GetBlogBySlug = async (req, res, next) => {
  const slug = req.params.slug;
  const blogs = await BlogSch.findOne({ SlugUrl: slug, IsDeleted: false, IsPublished: true }, { IsPublished: 0 });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blogs, null, blogConfig.get, null);
};
blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_at: new Date() } });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, blogConfig.delete, null);
};

module.exports = blogcontroller;
