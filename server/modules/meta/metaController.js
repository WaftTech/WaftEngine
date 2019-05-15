const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const metaConfig = require('./metaConfig');
const metaSch = require('./metaSchema');
const metaController = {};

metaController.getAllMeta = async (req, res, next) => {
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

    populate = '';
    selectq = 'client_route title meta_keywords meta_image added_by';
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
    if (req.query.find_client_route) {
      searchq = {
        client_route: {
          $regex: req.query.find_client_route,
          $options: 'i x',
        },
        ...searchq,
      };
    }
    let metas = await otherHelper.getquerySendResponse(metaSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, metas.data, metaConfig.get, page, size, metas.totaldata);
  } catch (err) {
    next(err);
  }
};

metaController.getDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const metaDetail = await metaSch.findOne({ _id: id, is_deleted: false }, 'client_route title meta_keywords meta_description meta_image added_by added_at updated_by updated_at');
    return otherHelper.sendResponse(res, httpStatus.OK, true, metaDetail, null, metaConfig.get, null);
  } catch (err) {
    next(err);
  }
};

metaController.getByRoute = async (req, res, next) => {
  try {
    const route = req.params[0];
    const metaDetail = await metaSch.findOne({ client_route: route, is_deleted: false }, 'title meta_keywords meta_description meta_image');
    return otherHelper.sendResponse(res, httpStatus.OK, true, metaDetail, null, metaConfig.get, null);
  } catch (err) {
    next(err);
  }
};

metaController.saveMeta = async (req, res, next) => {
  try {
    let { _id, client_route, title, meta_keywords, meta_description } = req.body;
    let metaS = { client_route, title, meta_keywords, meta_description };

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
      metaS.meta_image = req.file;
    }
    if (_id) {
      metaS.updated_by = req.user.id;
      metaS.updated_at = Date.now();
      const update = await metaSch.findOneAndUpdate(_id, { $set: metaS }, { new: true });
      if (!update) {
        return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, metaConfig.notFound, null);
      } else {
        return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, metaConfig.update, null);
      }
    } else {
      metaS.added_by = req.user.id;
      const newMeta = new metaSch(metaS);
      const metaSaved = await newMeta.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, metaSaved, null, metaConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};

metaController.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await metaSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: Date.now(), deleted_by: req.user.id } });
    if (del) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, metaConfig.delete, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, metaConfig.notFound, null);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = metaController;
