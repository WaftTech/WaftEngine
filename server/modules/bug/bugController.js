const httpStatus = require('http-status');
const bugSch = require('./bugSchema');
const bugHelper = require('../../helper/error.helper');
const otherHelper = require('../../helper/others.helper');
const bugController = {};

bugController.AddErrorToLogs = async (req, res, next, err) => {
  const errObj = bugHelper.getErrorObj(err, next);
  errObj.added_by = req.user && req.user.id;
  errObj.device = req.device;
  errObj.ip = req.client_ip_address;
  const bug = await bugSch(errObj);
  return bug.save();
};
bugController.GetErrors = async (req, res, next) => {
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
    selectq = 'error_message error_stack error_type added_at added_by device ip is_deleted';
    searchq = { is_deleted: false };
    if (req.query.find_errors) {
      searchq = { error_stack: { $regex: req.query.find_errors, $options: 'i' }, ...searchq };
    }
    populate = '';
    let bugs = await otherHelper.getquerySendResponse(bugSch, page, size, sortq, searchq, selectq, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs.data, 'Here are the error folks!!', page, size, bugs.totaldata);
  } catch (err) {
    next(err);
  }
};
bugController.GetErrorsGRBY = async (req, res, next) => {
  try {
    const bugs = await bugSch.aggregate([{ $group: { _id: '$error_type', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
    let totaldata = 0;
    bugs.forEach(each => {
      totaldata = totaldata + each.count;
    });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, bugs, 'errors by group by get success!!', 1, 1, totaldata);
  } catch (err) {
    next(err);
  }
};
bugController.DeleteError = async (req, res, next) => {
  try {
    const id = req.params.id;
    const del = await bugSch.findByIdAndUpdate(id, { $set: { is_deleted: true } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, del, null, 'bug delete success!', null);
  } catch (err) {
    next(err);
  }
};
bugController.DeleteAll = async (req, res, next) => {
  try {
    const dels = await bugSch.remove({});
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'all errors deleted!!', null);
  } catch (err) {
    next(err);
  }
};
module.exports = bugController;
