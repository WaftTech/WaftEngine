const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const blogConfig = require('./blogConfig');
const blogSch = require('./blogShema');
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
    selectq = 'title description summary tags keywords slug_url is_published published_on is_active image added_by added_at udated_at updated_by';
    searchq = { is_deleted: false };
    if (req.query.find_title) {
      searchq = { title: { $regex: req.query.find_title, $options: 'i x' }, ...searchq };
    }
    if (req.query.find_published_on) {
      searchq = { published_on: { $regex: req.query.find_published_on, $options: 'i x' }, ...searchq };
    }
    let blogs = await otherHelper.getquerySendResponse(blogSch, page, size, sortq, searchq, selectq, next, '');
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
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
    selectq = 'title description summary tags keywords slug_url published_on is_active image added_by added_at updated_at updated_by';
    searchq = { is_deleted: false };
    searchq = { is_published: true, ...searchq };
    if (req.query.find_title) {
      searchq = { title: { $regex: req.query.find_title, $options: 'i x' }, ...searchq };
    }
    if (req.query.find_published_on) {
      searchq = { published_on: { $regex: req.query.find_published_on, $options: 'i x' }, ...searchq };
    }
    let blogs = await otherHelper.getquerySendResponse(blogSch, page, size, sortq, searchq, selectq,next, '');
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    let d = new Date();
    blogs.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogs.title}`);
    if (blogs && blogs._id) {
      if (req.files && req.files[0]) {
        blogs.Image = req.files;
      }
      const update = await blogSch.findByIdAndUpdate(blogs._id, { $set: blogs });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, blogConfig.save, null);
    } else {
      blogs.image = req.files;
      const newBlog = new blogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, BlogSave, null, blogConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const blog = await blogSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.get, null);
};
blogcontroller.GetBlogBySlug = async (req, res, next) => {
  const slug = req.params.slug;
  const blogs = await blogSch.findOne({ slug_url: slug, is_deleted: false, is_published: true }, { IsPublished: 0 });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogs, null, blogConfig.get, null);
};
blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await blogSch.findByIdAndUpdate(objectId(id), { $set: { is_deleted: true, deleted_at: new Date() } });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.delete, null);
};

module.exports = blogcontroller;
