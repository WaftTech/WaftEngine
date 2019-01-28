const HttpStatus = require('http-status');
const BugSch = require('./bug');
const BugHelper = require('../../helper/error.helper');
const otherHelper = require('../../helper/others.helper');
const bugController = {};

bugController.AddErrorToLogs = async (req, res, next, err) => {
  const errObj = BugHelper.getErrorObj(err, next);
  errObj.AddedBy = req.user && req.user.id;
  errObj.device = req.device;
  errObj.ip = req.client_ip_address;
  const Bug = await BugSch(errObj);
  return Bug.save();
};
bugController.GetErrors = async (req, res, next) => {
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
    selectq = 'error_message error_stack error_type AddedAt AddedBy device ip';
    searchq = {};
    let bugs = await otherHelper.getquerySendResponse(BugSch, page, size, sortq, searchq, selectq, '', next);
    return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, bugs.data, 'Here are the error folks!!', page, size, bugs.totaldata);
  } catch (err) {
    next(err);
  }
};
module.exports = bugController;
