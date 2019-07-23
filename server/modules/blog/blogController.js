const httpStatus = require('http-status');
var objectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const blogConfig = require('./blogConfig');
const blogSch = require('./blogShema');
const blogCatSch = require('./categorySchema');
const blogcontroller = {};

blogcontroller.GetBlogAuthorize = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let searchq;
    let populate;
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
    populate = [
      {
        path: 'category',
        select: '_id title',
      },
    ];
    selectq = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url is_published published_on is_active image added_by added_at udated_at updated_by';
    searchq = {
      is_deleted: false,
    };
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_published_on) {
      searchq = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let blogs = await otherHelper.getquerySendResponse(blogSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};
blogcontroller.getLatestBlog = async (req, res, next) => {
  try {
    const data = await blogSch
      .find({ is_active: true, is_deleted: false })
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1 })
      .sort({ _id: -1 })
      .skip(0)
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest Blog', null);
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
    let populate;
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
    populate = [
      {
        path: 'category',
        select: '_id title',
      },
    ];
    selectq = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url published_on is_active image added_by added_at updated_at updated_by';
    searchq = {
      is_deleted: false,
    };
    searchq = {
      is_published: true,
      ...searchq,
    };
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchq,
      };
    }
    if (req.query.find_published_on) {
      searchq = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchq,
      };
    }
    let blogs = await otherHelper.getquerySendResponse(blogSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogCategory = async (req, res, next) => {
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
    selectq = 'title slug_url is_active added_by added_at is_deleted';
    searchq = { is_deleted: false };
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchq,
      };
    }
    let blogcats = await otherHelper.getquerySendResponse(blogCatSch, page, size, sortq, searchq, selectq, next, '');
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogcats.data, blogConfig.cget, page, size, blogcats.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogcats = await blogCatSch.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, blogcats, null, blogConfig.cget, null);
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    if (req.file) {
      req.file.destination =
        req.file.destination
          .split('\\')
          .join('/')
          .split('server/')[1] + '/';
      req.file.path = req.file.path
        .split('\\')
        .join('/')
        .split('server/')[1];
    }
    let d = new Date();

    blogs.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogs.title}`);
    if (blogs && blogs._id) {
      if (req.file) {
        blogs.image = req.file;
      }
      const update = await blogSch.findByIdAndUpdate(
        blogs._id,
        {
          $set: blogs,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, blogConfig.save, null);
    } else {
      blogs.image = req.file;
      const newBlog = new blogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, BlogSave, null, blogConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlogCategory = async (req, res, next) => {
  try {
    let blogcats = req.body;
    let d = new Date();
    blogcats.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogcats.title}`);
    if (blogcats && blogcats._id) {
      const update = await blogCatSch.findByIdAndUpdate(
        blogcats._id,
        {
          $set: blogcats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, blogConfig.csave, null);
    } else {
      // blogcats.added_by = req.user.id;
      const newBlog = new blogCatSch(blogcats);
      const catSave = await newBlog.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, blogConfig.csave, null);
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const populate = [];
  const blog = await blogSch
    .findOne({
      _id: id,
      is_deleted: false,
    })
    .populate(populate);
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.get, null);
};

blogcontroller.GetBlogBySlug = async (req, res, next) => {
  const slug = req.params.slug_url;
  const blogs = await blogSch.findOne(
    {
      slug_url: slug,
      is_deleted: false,
      is_published: true,
    },
    {
      is_published: 0,
    },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogs, null, blogConfig.get, null);
};

blogcontroller.GetBlogByCat = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let sortq;
    let populate;
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
    const id = req.params.id;
    populate = [
      {
        path: 'category',
        select: '_id title',
      },
    ];
    selectq = 'title description summary tags author short_description meta_tag meta-description category keywords slug_url published_on is_active image added_by added_at updated_at updated_by';
    searchq = {
      is_deleted: false,
    };
    searchq = {
      is_published: true,
      is_deleted: false,
      category: id,
      ...searchq,
    };
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_published_on) {
      searchq = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let blogs = await otherHelper.getquerySendResponse(blogSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, blogs.data, blogConfig.get, page, size, blogs.totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogByTag = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchq;
    const size_default = 10;
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
    const tag = req.params.tag;
    searchq = {
      is_deleted: false,
      tags: tag,
    };
    const tagBlog = await blogSch.find(searchq);
    const totaldata = await blogSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagBlog, blogConfig.get, page, size, totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogByDate = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchq;
    const size_default = 10;
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
    let start = new Date(req.params.time);
    let end = new Date(req.params.time);
    end.setMonth(end.getMonth() + 1);

    searchq = {
      is_deleted: false,
    };
    if (start) {
      searchq = {
        added_at: {
          $gte: start,
          $lt: end,
        },
        ...searchq,
      };
    }
    const tagBlog = await blogSch.find(searchq);
    const totaldata = await blogSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagBlog, blogConfig.get, page, size, totaldata);
  } catch (err) {
    next(err);
  }
};

blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await blogSch.findByIdAndUpdate(objectId(id), {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blog, null, blogConfig.delete, null);
};
blogcontroller.DeleteBlogCat = async (req, res, next) => {
  const id = req.params.id;
  const blogCat = await blogCatSch.findByIdAndUpdate(objectId(id), {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, blogCat, null, blogConfig.deleteCat, null);
};

module.exports = blogcontroller;
