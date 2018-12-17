const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const BlogSch = require('./blog');
const blogcontroller = {};
const internal = {};

blogcontroller.GetBlog = async (req, res, next) => {
  const blogs = await BlogSch.find({ IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blogs, null, 'blogs got successfully.', null);
};

blogcontroller.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    console.log('blogs', blogs);
    if (blogs && blogs._id) {
      if (req.files && req.files[0]) {
        blogs.BlogImage = req.files[0];
        // blogs.Updated_by = req.user.id;
      }
      const update = await BlogSch.findByIdAndUpdate(blogs._id, { $set: blogs });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Blogs saved successfully.', null);
    } else {
      blogs.BlogImage = req.files && req.files[0];
      //blogs.Added_by = req.user.id;
      const newBlog = new BlogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, BlogSave, null, 'Blog saved successfully.', null);
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findOne({ _id: id, IsDeleted: false });
  console.log(blog);
  if (blog && blog._id) {
    return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, 'blog successfully obtained.', null);
  } else {
    return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, null, 'blog not found', null);
  }
};

blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_at: new Date() } });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, 'Blog deleted successfully!!', null);
};
module.exports = blogcontroller;
