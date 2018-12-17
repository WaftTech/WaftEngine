const HttpStatus = require('http-status');
//var DesignationId = require('mongoose').Types.postId;
const otherHelper = require('../../helper/others.helper');
const DesignationSch = require('./Designation');
const DesignationController = {};

DesignationController.GetDesignation = async (req, res, next) => {
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);

    if (sortby == 1 && !isNaN(sortby)) {
      // 1 is for ascending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for descending
      sortquery = '_' + sortfield;
    } else {
      sortquery = '';
    }
  }
  if (req.query.search) {
    let searchvars = req.query.search.split('_');
    searchfield = searchvars[0];
    searchkey = searchvars[1];
    searchquery = { [searchfield]: { $regex: searchkey, $options: 'i' }, IsDeleted: false };
  } else {
    searchquery = {};
  }

  selectquery = { IsDeleted: 0, Deleted_by: 0, Deleted_at: 0 };

  let datas = otherHelper.getquerySendResponse(DesignationSch, page, size, sortquery, searchquery, selectquery, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, datas.data, 'Designation Data delivered successfully', page, size, datas.totaldata);
};

DesignationController.getDataByID = async (req, res, next) => {
  try {
    let data = await DesignationSch.findById(req.params.id);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Designation data in detail delivered successfully!!', null);
  } catch (err) {
    next(err);
  }
};

DesignationController.AddDesignation = async (req, res, next) => {
  try {
    let Designation = req.body;
    if (Designation._id) {
      let update = await DesignationSch.findByIdAndUpdate(Designation._id, { $set: Designation });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Designation Saved Success !!', null);
    } else {
      // Designation.Added_by = req.user.id;
      let newDesignation = new DesignationSch(Designation);
      await newDesignation.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newDesignation, null, 'Designation Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};

DesignationController.deletebyID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Designation = await DesignationSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, Designation, null, 'Designation Get Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = DesignationController;
