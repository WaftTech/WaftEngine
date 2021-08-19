const httpStatus = require('http-status');
const faqSch = require('./faqSchema');
const faqCatSch = require('./faqCategorySchema');
const otherHelper = require('../../helper/others.helper');
const faqConfig = require('./faqConfig');
const faqController = {};

faqController.PostFaq = async (req, res, next) => {
  try {
    const faqs = req.body;
    if (faqs && faqs._id) {
      faqs.updated_at = new Date();
      faqs.updated_by = req.user.id;
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
      faqCat.updated_at = new Date();
      faqCat.updated_by = req.user.id;
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
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);

    if (req.query.find_description) {
      searchQuery = {
        description: {
          $regex: req.query.find_description,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_category) {
      searchQuery = { category: req.query.find_category, ...searchQuery };
    }
    if (req.query.find_question) {
      searchQuery = {
        question: {
          $regex: req.query.find_question,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    populate = [{ path: 'category', select: '_id title' }];
    let faq = await otherHelper.getQuerySendResponse(faqSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, faq.data, faqConfig.faqGet, page, size, faq.totalData);
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
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    searchQuery = { ...searchQuery, is_active: true };

    if (req.query.find_title || req.query.size || req.query.is_active || req.query.page) {
      delete searchQuery.is_active;
      if (req.query.page && req.query.page == 0) {
        selectQuery = 'title is_active';
        const faqCats = await faqCatSch.find({ searchQuery }).select(selectQuery);
        return otherHelper.sendResponse(res, httpStatus.OK, true, faqCats, null, 'all faq category get success!!', null);
      }
      if (req.query.find_title) {
        searchQuery = {
          title: {
            $regex: req.query.find_title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
    }
    let faqCat = await otherHelper.getQuerySendResponse(faqCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, faqCat.data, faqConfig.catGet, page, size, faqCat.totalData);
  } catch (err) {
    next(err);
  }
};
faqController.GetFaqCatDropDown = async (req, res, next) => {
  try {
    let selectQuery = 'title is_active';
    const faqCats = await faqCatSch.find({ is_deleted: false, is_active: true }).select(selectQuery);
    return otherHelper.sendResponse(res, httpStatus.OK, true, faqCats, null, 'all faq category get success!!', null);
  } catch (err) {
    next(err);
  }
};
faqController.GetFaqCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const faqCats = await faqCatSch.findOne({
      _id: id,
      is_deleted: false,
    });
    return otherHelper.sendResponse(res, httpStatus.OK, true, faqCats, null, faqConfig.catGet, null);
  } catch (err) {
    next(err);
  }
};

faqController.GetFaqByCat = async (req, res, next) => {
  try {
    let page;
    let size;
    let searchQuery;
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
    searchQuery = {
      is_deleted: false,
      category: id,
    };
    const categoryFaq = await faqSch.find(searchQuery);
    const totalData = await faqSch.countDocuments(searchQuery);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, categoryFaq, faqConfig.faqGet, page, size, totalData);
  } catch (err) {
    next(err);
  }
};
faqController.DeleteFaq = async (req, res, next) => {
  const id = req.params.id;
  const faq = await faqSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, faq, null, faqConfig.faqDelete, null);
};

faqController.DeleteFaqCat = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delCat = await faqCatSch.findByIdAndUpdate(id, {
      $set: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
    await faqSch.updateMany({ category: id, is_deleted: false }, { $set: { is_deleted: true } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, delCat, null, 'faq category deleted!!', null);
  } catch (err) {
    next(err);
  }
};

faqController.GetFaqAndCat = async (req, res, next) => {
  const cat = await faqCatSch.find().select('title');
  const faq = await faqSch.find({ is_deleted: false }).select('description question category');
  return otherHelper.sendResponse(res, httpStatus.OK, true, { cat, faq }, null, null, null);
};

faqController.GetCatByKey = async (req, res, next) => {
  try {
    const key = req.params.key;
    const cat = await faqCatSch.findOne({
      key,
      is_deleted: false,
    });
    if (!cat) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Key not Found', null);

    const faq = await faqSch.find({ is_deleted: false, category: cat }).select('description question category');

    return otherHelper.sendResponse(res, httpStatus.OK, true, { cat, faq }, null, faqConfig.catGet, null);
  } catch (err) {
    next(err);
  }
};

faqController.CountFaqByCat = async (req, res, next) => {
  const id = req.params.id;
  const faqCount = await faqSch.countDocuments({ category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, faqCount, null, 'faq count by category', null);
};

faqController.selectMultipleData = async (req, res, next) => {
  const { faq_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await faqSch.updateMany({ _id: { $in: faq_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await faqSch.updateMany(
      { _id: { $in: faq_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

faqController.selectMultipleDataCat = async (req, res, next) => {
  const { faq_category_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await faqCatSch.updateMany({ _id: { $in: faq_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await faqCatSch.updateMany(
      { _id: { $in: faq_category_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};
module.exports = faqController;
