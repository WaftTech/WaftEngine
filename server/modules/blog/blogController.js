const HttpStatus = require("http-status");
var ObjectId = require("mongoose").Types.ObjectId;
const otherHelper = require("../../helper/others.helper");
const BlogSch = require("./blog");
const blogcontroller = {};
const internal = {};

blogcontroller.GetBlog = async (req, res, next) => {
  const blogs = await BlogSch.find({ IsDeleted: false });
  return otherHelper.sendResponse(
    res,
    HttpStatus.OK,
    true,
    blogs,
    null,
    "blogs got successfully.",
    null
  );
};

blogcontroller.getPost = async (req, res, next) => {
  const link = req.params.link;

  try {
    let contents = await blogModel.findOne({ link, publish_status: true });
    console.log(contents);
    if (contents != null) {
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        contents,
        null,
        "Content Get Success!!!",
        null
      );
    } else {
      return otherHelper.sendResponse(
        res,
        HttpStatus.NOT_FOUND,
        false,
        null,
        "post doesn't exist!",
        null
      );
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.deletePost = async (req, res, next) => {
  const link = req.params.link;

  try {
    let contents = await blogModel.deleteOne({ link });
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      contents,
      null,
      "Blog Delete Success!!!",
      null
    );
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findOne({ _id: id, IsDeleted: false });
  console.log(blog);
  if (blog && blog._id) {
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      blog,
      null,
      "blog successfully obtained.",
      null
    );
  } else {
    return otherHelper.sendResponse(
      res,
      HttpStatus.NOT_FOUND,
      false,
      null,
      null,
      "blog not found",
      null
    );
  }
};

blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findByIdAndUpdate(ObjectId(id), {
    $set: { IsDeleted: true, Deleted_at: new Date() }
  });
  console.log(blog);
  return otherHelper.sendResponse(
    res,
    HttpStatus.OK,
    true,
    blog,
    null,
    "Blog deleted successfully!!",
    null
  );
};

module.exports = blogcontroller;
