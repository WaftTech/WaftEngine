const httpStatus = require('http-status');
const objectId = require('mongoose').Types.ObjectId;
const faqSch = require('./faqSchema');
const faqCatSch = require('./faqCategorySchema');
const otherHelper = require('../../helper/others.helper');
const faqConfig = require('./faqConfig');
const faqController = {};

faqController.PostFaq = async (req, res, next) => {
  try {
    const faqs = req.body;
    if (faqs && faqs._id) {
      const update = await faqSch.findByIdAndUpdate(faqs._id, { $set: faqs });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, faqConfig.faqSave, null);
    } else {
      faqs.added_by = req.user.id;
      const newfaqs = new faqSch(faqs);
      const savefaqs = await newfaqs.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, savefaqs, null, faqConfig.faqSave, null);
    }
  } catch (err) {
    next(err);
  }
};
faqController.PostFaqCat = async (req, res, next) => {
  try {
    const faqCat = req.body;
    let d = new Date();
    faqCat.slug_url = otherHelper.slugify(`${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()} ${faqCat.title}`);
    if (faqCat && faqCat._id) {
      const update = await faqCatSch.findByIdAndUpdate(faqCat._id, { $set: faqCat });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, faqConfig.catSave, null);
    } else {
      faqCat.added_by = req.user.id;
      const newFaqCat = new faqCatSch(faqCat);
      const saveFaqCat = await newFaqCat.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, saveFaqCat, null, faqConfig.catSave, null);
    }
  } catch (err) {
    next(err);
  }
};
faqController.GetFaq = async (req, res, next) => {
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
    selectq = 'title question category added_by added_at updated_at';

    searchq = { is_deleted: false };

    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_category) {
      searchq = {
        category: {
          $regex: req.query.find_category,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    if (req.query.find_question) {
      searchq = {
        question: {
          $regex: req.query.find_question,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    populate = [{ path: 'category', select: '_id title' }];
    let faq = await otherHelper.getquerySendResponse(faqSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, faq.data, faqConfig.faqGet, page, size, faq.totaldata);
  } catch (err) {
    next(err);
  }
};
faqController.GetFaqById = async (req, res, next) => {
  const id = req.params.id;
  const faq = await faqSch.findOne({ _id: id, is_deleted: false }, { __v: 0, deleted_at: 0 });
  return otherHelper.sendResponse(res, httpStatus.OK, true, faq, null, faqConfig.faqGet, null);
};
faqController.GetFaqCat = async (req, res, next) => {
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
    selectq = 'title slug_url added_by added_at';

    searchq = { is_deleted: false };
    if (req.query.find_title) {
      searchq = {
        title: {
          $regex: req.query.find_title,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    populate = '';
    let faqcat = await otherHelper.getquerySendResponse(faqCatSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, faqcat.data, faqConfig.catGet, page, size, faqcat.totaldata);
  } catch (err) {
    next(err);
  }
};
faqController.GetFaqCatBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const faqCats = await faqCatSch.findOne(
      {
        slug_url: slug,
      },
      {
        __v: 0,
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, faqCats, null, faqConfig.catGet, null);
  } catch (err) {
    next(err);
  }
};
faqController.GetFaqByCat = async (req, res, next) => {
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
      is_deleted: false,
      category: id,
    };
    const catgoryFaq = await faqSch.find(searchq);
    const totaldata = await faqSch.countDocuments(searchq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, catgoryFaq, faqConfig.faqGet, page, size, totaldata);
  } catch (err) {
    next(err);
  }
};
faqController.DeleteFaq = async (req, res, next) => {
  const id = req.params.id;
  const faq = await faqSch.findByIdAndUpdate(objectId(id), {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, faq, null, faqConfig.faqDelete, null);
};

module.exports = faqController;
