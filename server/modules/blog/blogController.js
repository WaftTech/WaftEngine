<<<<<<< HEAD
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
=======
const HttpStatus = require('http-status');
//var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const blogModel = require('./blog_model');
const blogController = {};

blogController.getDefault = async(req, res, next)=>{
    try{
        let blogContent = await blogModel.find({publish_status : true}).limit(10);

        if(blogContent != null){
            return otherHelper.sendResponse(res, HttpStatus.OK, true, blogContent, null, "Blog Content Get Success!!!", null);
        }
        else{
            return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, "No post exists!", null);
        }
    
    }catch(err){
        next(err);
>>>>>>> 0d354d869415b575a5d58e0dc23798ef6522b6ec
    }
  } catch (err) {
    next(err);
  }
};

<<<<<<< HEAD
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
=======
blogController.savePost = async (req, res, next)=>{
        try{
        let blogContent = req.body;
        console.log("Blog Contents: ",blogContent);
        if(blogContent && blogContent._id){
            if(req.files && req.files[0]){
                //blogContent.contentImage = req.files[0];
                blogContent.images = req.files;
            }
        let update = await blogModel.findByIdAndUpdate(blogContent._id, blogContent );
        return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null , 'Blog Contents update!!!', null);
        }
        else{
            //blogContent.contentImage = req.files && req.files[0];
            let unique_status = await blogModel.findOne({link : req.body.link});
            if(unique_status == null){
                blogContent.images = req.files;
                let newBlog = new blogModel(blogContent);
                let contentSave = await newBlog.save();
                return otherHelper.sendResponse(res, HttpStatus.OK, true, contentSave, null, 'Content Save successful!!', null);
            }
            else {
                return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, "duplicate link!!!", null);
            }
           

        }

    }catch(err){
        console.log("error here!!!");
        next(err);
    }

};

blogController.getPost = async (req, res, next)=>{
    const link = req.params.link;

    try{
        let contents = await blogModel.findOne({link, publish_status : true} );
        console.log(contents);
        if(contents != null){
            return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, "Content Get Success!!!", null);
        }
        else{
            return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, "post doesn't exist!", null);
        }
    }catch(err){
        next(err);
    }
>>>>>>> 0d354d869415b575a5d58e0dc23798ef6522b6ec

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

<<<<<<< HEAD
module.exports = blogcontroller;
=======
blogController.deletePost = async (req, res, next)=>{
    const link = req.params.link;

    try{
        let contents = await blogModel.deleteOne({link});
        return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, "Blog Delete Success!!!", null);
        
    }catch(err){
        next(err);
    }
    

};

blogController.getByPublisher = async(req, res, next)=>{
    const publisher = req.params.user;
    try{
        let contents = await blogModel.find({publisher});
        console.log(contents.length);
        if(contents.length != 0){
            return otherHelper.sendResponse(res, HttpStatus.OK, true, contents, null, `posts from ${publisher}`, null);
        }
        else{
            return otherHelper.sendResponse(res, HttpStatus.NOT_FOUND, false, null, "User doesn't exist!", null);            
        }
    }catch(err){
        next(err);
    }

};

module.exports = blogController;
>>>>>>> 0d354d869415b575a5d58e0dc23798ef6522b6ec
