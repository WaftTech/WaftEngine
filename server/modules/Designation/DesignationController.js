const HttpStatus = require('http-status');
//var DesignationId = require('mongoose').Types.postId;
const otherHelper = require('../../helper/others.helper');
const DesignationSch = require('./Designation');
const DesignationController = {};

DesignationController.GetDesignation = async (req, res, next) => {
  let page;
  const size_default = 10;
  let size;
  let searchquery;
  let sortquery;
  let selectquery;
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    size = Math.abs(req.query.page);
  } else {
    size = size_default;
  }

  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);

    if (sortby == 1 && !isNaN(sortby)) {
      // 1 is for ascending
      sortquery = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      // 0 is for descending
      sortquery = '-' + sortfield;
    } else {
      sortquery = '';
    }
  }

  searchquery = { IsDeleted: false };
  if (req.query.find_Designation) {
    searchquery = { Designation: { $regex: req.query.find_Designation, $options: 'i x' }, ...searchquery };
  }

  selectquery = { IsDeleted: 0, Deleted_by: 0, Deleted_at: 0 };

  let datas = await otherHelper.getquerySendResponse(DesignationSch, page, size, sortquery, searchquery, selectquery, next);
  console.log(datas);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, 'Designation Data delivered successfully', page, size, datas.totaldata);
};

DesignationController.GetDesignationDetail = async (req, res, next) => {
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
    const Designation = await DesignationSch.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, Designation, null, 'Designation Get Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = DesignationController;
