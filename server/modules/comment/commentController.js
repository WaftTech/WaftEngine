const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const commentSch = require('./commentSchema');
const blogSch = require('../blog/blogSchema');
const commentController = {};

commentController.PostComment = async (req, res, next) => {
  try {
    const data = req.body;
    if (data._id) {
      data.updated_at = Date.now();
      data.updated_by = req.user.id;
      const update = await commentSch.findOneAndUpdate({ _id: data._id, added_by: req.user.id }, { $set: data }, { new: true });
      if (update) {
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'comment edit success!!', null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'You are not allowed to edit!!', null);
      }
    } else {
      data.status = 'posted';
      data.added_by = req.user.id;
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
    let { page, size, populate, selectq, searchq, sortq } = otherHelper.parseFilters(req, 10, false);
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
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchq,
      };
    }
    if (req.query.find_blog_id) {
      const blog = await blogSch.find({ title: { $regex: req.query.find_blog_id, $options: 'i' } }).select({ _id: 1 });
      const blogId = blog.map(each => each._id);
      searchq = {
        blog_id: { $in: blogId },
        ...searchq,
      };
    }

    let blogComments = await otherHelper.getquerySendResponse(commentSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogComments.data, 'comments get success!!', page, size, blogComments.totaldata);
  } catch (err) {
    next(err);
  }
};
commentController.GetCommentByBlog = async (req, res, next) => {
  try {
    const id = req.params.blog;
    const comment = await commentSch
      .find({ blog_id: id, is_deleted: false })
      .populate({ path: 'added_by', select: 'name' })
      .sort({ _id: -1 });
    const totaldata = comment.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { comment, totaldata }, null, 'comment get success!!', null);
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
    if (data.is_approved) {
      data.approved_by = req.user.id;
      data.approved_at = Date.now();
      data.status = 'approved';
    } else if (data.is_disapproved) {
      data.disapproved_by = req.user.id;
      data.disapproved_at = Date.now();
      data.status = 'disapproved';
    } else {
      data.status = 'onhold';
    }
    const comment = await commentSch.findOneAndUpdate({ _id: data._id, is_deleted: false }, { $set: data }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment approve/disapprove success!!', null);
  } catch (err) {
    next(err);
  }
};
commentController.DisApproveComment = async (req, res, next) => {
  try {
    const data = req.body;
    data.disapproved_by = req.user.id;
    data.disapproved_at = Date.now();
    data.status = 'disapproved';
    const comment = await commentSch.findOneAndUpdate({ _id: data.id, is_deleted: false }, { $set: data }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, comment, null, 'comment disapprove success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = commentController;
