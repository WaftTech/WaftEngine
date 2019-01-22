const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const blogConfig = require('./blogConfig');
const blogCatSch = require('./categorySchema');
const BlogSch = require('./blog');
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
        path: 'Category',
        select: '_id title slug_url',
      },
    ];
    selectq =
      'Title Description Summary Tags Keywords SlugUrl Category IsPublished PublishedOn IsActive Image Added_by Added_at Updated_at Updated_by';
    searchq = {
      IsDeleted: false,
    };
    if (req.query.find_Title) {
      searchq = {
        Title: {
          $regex: req.query.find_Title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_PublishedOn) {
      searchq = {
        PublishedOn: {
          $regex: req.query.find_PublishedOn,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let blogs = await otherHelper.getquerySendResponse(
      BlogSch,
      page,
      size,
      sortq,
      searchq,
      selectq,
      populate,
      next,
    );
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      blogs.data,
      blogConfig.get,
      page,
      size,
      blogs.totaldata,
    );
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
        path: 'Category',
        select: '_id title slug_url',
      },
    ];
    selectq =
      'Title Description Summary Tags Keywords SlugUrl Category PublishedOn IsActive Image Added_by Added_at Updated_at Updated_by';
    searchq = {
      IsDeleted: false,
    };
    searchq = {
      IsPublished: true,
      ...searchq,
    };
    if (req.query.find_Title) {
      searchq = {
        Title: {
          $regex: req.query.find_Title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_PublishedOn) {
      searchq = {
        PublishedOn: {
          $regex: req.query.find_PublishedOn,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let blogs = await otherHelper.getquerySendResponse(
      BlogSch,
      page,
      size,
      sortq,
      searchq,
      selectq,
      populate,
      next,
    );
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      blogs.data,
      blogConfig.get,
      page,
      size,
      blogs.totaldata,
    );
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlog = async (req, res, next) => {
  try {
    let blogs = req.body;
    let d = new Date();
    blogs.SlugUrl = otherHelper.slugify(
      `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogs.Title}`,
    );
    if (blogs && blogs._id) {
      if (req.files && req.files[0]) {
        blogs.Image = req.files;
      }
      const update = await BlogSch.findByIdAndUpdate(blogs._id, {
        $set: blogs,
      });
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        update,
        null,
        blogConfig.save,
        null,
      );
    } else {
      blogs.Image = req.files;
      const newBlog = new BlogSch(blogs);
      const BlogSave = await newBlog.save();
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        BlogSave,
        null,
        blogConfig.save,
        null,
      );
    }
  } catch (err) {
    next(err);
  }
};

blogcontroller.SaveBlogCategory = async (req, res, next) => {
  try {
    let blogcats = req.body;
    let d = new Date();
    blogcats.slug_url = otherHelper.slugify(
      `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${blogcats.title}`,
    );
    if (blogcats && blogcats._id) {
      const update = await blogCatSch.findByIdAndUpdate(blogcats._id, {
        $set: blogcats,
      });
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        update,
        null,
        blogConfig.csave,
        null,
      );
    } else {
      // blogcats.added_by = req.user.id;
      const newBlog = new blogCatSch(blogcats);
      const catSave = await newBlog.save();
      return otherHelper.sendResponse(
        res,
        HttpStatus.OK,
        true,
        catSave,
        null,
        blogConfig.csave,
        null,
      );
    }
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
    selectq = 'title slug_url added_by added_at';
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let blogcats = await otherHelper.getquerySendResponse(
      blogCatSch,
      page,
      size,
      sortq,
      searchq,
      selectq,
      '',
      next,
    );
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      blogcats.data,
      blogConfig.cget,
      page,
      size,
      blogcats.totaldata,
    );
  } catch (err) {
    next(err);
  }
};

blogcontroller.GetBlogCatBySlug = async (req, res, next) => {
  const slug = req.params.slug;
  const blogcats = await blogCatSch.findOne(
    {
      slug_url: slug,
    },
    {
      __v: 0,
    },
  );
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blogcats, null, blogConfig.cget, null);
};
blogcontroller.GetBlogByCat = async (req, res, next) => {
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
    const id = req.params.id;
    searchq = {
      IsDeleted: false,
      Category: id,
    };
    const catgoryBlog = await BlogSch.find(searchq);
    const totaldata = await BlogSch.countDocuments(searchq);
    const categoryDetail = await blogCatSch.findById(id);
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      { blog: catgoryBlog, category: categoryDetail },
      blogConfig.get,
      page,
      size,
      totaldata,
    );
  } catch (err) {
    next(err);
  }
};
blogcontroller.GetBlogByCatSlug = async (req, res, next) => {
  try {
    const categoryDetail = await blogCatSch.findOne({ slug_url: req.params.slug });
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
    const id = categoryDetail._id;
    searchq = {
      IsDeleted: false,
      Category: id,
    };
    const catgoryBlog = await BlogSch.find(searchq);
    const totaldata = await BlogSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      { blog: catgoryBlog, category: categoryDetail },
      blogConfig.get,
      page,
      size,
      totaldata,
    );
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
      IsDeleted: false,
      Tags: tag,
    };
    const tagBlog = await BlogSch.find(searchq);
    const totaldata = await BlogSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      tagBlog,
      blogConfig.get,
      page,
      size,
      totaldata,
    );
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
      IsDeleted: false,
    };
    if (start) {
      searchq = {
        Added_at: {
          $regex: yearmonth,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    const tagBlog = await BlogSch.find(searchq);
    const totaldata = await BlogSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(
      res,
      HttpStatus.OK,
      true,
      tagBlog,
      blogConfig.get,
      page,
      size,
      totaldata,
    );
  } catch (err) {
    next(err);
  }
};
blogcontroller.GetBlogDetail = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findOne({
    _id: id,
    IsDeleted: false,
  });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, blogConfig.get, null);
};
blogcontroller.GetBlogBySlug = async (req, res, next) => {
  const slug = req.params.slug;
  const blogs = await BlogSch.findOne(
    {
      SlugUrl: slug,
      IsDeleted: false,
      IsPublished: true,
    },
    {
      IsPublished: 0,
    },
  );
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blogs, null, blogConfig.get, null);
};
blogcontroller.DeleteBlog = async (req, res, next) => {
  const id = req.params.id;
  const blog = await BlogSch.findByIdAndUpdate(ObjectId(id), {
    $set: {
      IsDeleted: true,
      Deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, blog, null, blogConfig.delete, null);
};

module.exports = blogcontroller;
