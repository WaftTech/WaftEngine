const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const commentSch = require('./commentSchema');
const blogSch = require('../blog/blogSchema');
const settingsHelper = require('./../../helper/settings.helper')
const commentController = {};

commentController.PostComment = async (req, res, next) => {
  try {
    const data = req.body;
    let commentStatus = await settingsHelper('comment', 'default_status_of_comment');
    if (data._id) {
      data.updated_at = Date.now();
      if (req.user) {
        data.updated_by = req.user.id;
      }
      const update = await commentSch.findOneAndUpdate({ _id: data._id, added_by: req.user.id }, { $set: data }, { new: true });
      if (update) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'comment edit success!!', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'You are not allowed to edit!!', null);
      }
    } else {
      data.status = commentStatus;
      // console.log(data.status , 'status')
      if (req.user) {
        data.added_by = req.user.id;
      }
      const newComment = new commentSch(data);
      const saveComment = await newComment.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saveComment, null, 'comment added successfully!!', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.GetComment = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      {
        path: 'blog_id',
        select: 'title',
      },
      {
        path: 'added_by',
        select: 'name',
      },
    ];
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_blog_id) {
      const blog = await blogSch.find({ title: { $regex: req.query.find_blog_id, $options: 'i' } }).select({ _id: 1 });
      const blogId = blog.map(each => each._id);
      searchQuery = {
        blog_id: { $in: blogId },
        ...searchQuery,
      };
    }

    if (req.query.find_is_approved) {
      searchQuery = { ...searchQuery, is_approved: req.query.find_is_approved };
    }
    if (req.query.find_is_disapproved) {
      searchQuery = { ...searchQuery, is_disapproved: req.query.find_is_disapproved };
    }

    let blogComments = await otherHelper.getQuerySendResponse(commentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogComments.data, 'comments get success!!', page, size, blogComments.totalData);
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentByBlog = async (req, res, next) => {
  try {
    const id = req.params.blog;
    const comment = await commentSch
      .find({ blog_id: id, is_deleted: false, status: 'approved' })
      .populate({ path: 'added_by', select: 'name' })
      .sort({ _id: -1 });
    const totalData = comment.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totalData }, null, 'comment get success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.DeleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await commentSch.findOneAndUpdate({ _id: id, is_deleted: false }, { $set: { is_deleted: true, deleted_at: Date.now() } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment delete success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await commentSch.findOne({ _id: id, is_deleted: false }).populate([
      { path: 'blog_id', select: 'title' },
      { path: 'added_by', select: 'name' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment get success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.ApproveComment = async (req, res, next) => {
  try {
    const data = req.body;
    const comments = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let update = {};
        update = await commentSch.findOneAndUpdate({ _id: data[i], is_deleted: false }, { $set: { is_approved: true, is_disapproved: false, approved_by: req.user.id, approved_at: Date.now(), status: 'approved' } }, { new: true });
        comments.push(update);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, comments, null, 'comment approve success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'invalid data', 'data not selected for approve!!', null);
    }
  } catch (err) {
    next(err);
  }
};
commentController.DisApproveComment = async (req, res, next) => {
  try {
    const data = req.body;
    const comments = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let update = {};
        update = await commentSch.findOneAndUpdate({ _id: data[i], is_deleted: false }, { $set: { is_disapproved: true, is_approved: false, disapproved_by: req.user.id, disapproved_at: Date.now(), status: 'disapproved' } }, { new: true });
        comments.push(update);
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, comments, null, 'comment disapprove success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, 'invalid data', 'data not selected for disapprove!!', null);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = commentController;
