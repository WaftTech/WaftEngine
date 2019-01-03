const HttpStatus = require('http-status');
//var DesignationId = require('mongoose').Types.postId;
const otherHelper = require('../../helper/others.helper');
const DesignationSch = require('./Designation');
const DesignationConfig = require('./DesignationConfig');
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
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
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

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, DesignationConfig.validationMessage.GetDesignation, page, size, datas.totaldata);
};

DesignationController.GetDesignationDetail = async (req, res, next) => {
  try {
    let data = await DesignationSch.findOne({ _id: req.params.id, IsDeleted: false });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, DesignationConfig.validationMessage.GetDesignationDetail, null);
  } catch (err) {
    next(err);
  }
};

DesignationController.AddDesignation = async (req, res, next) => {
  try {
    let Designation = req.body;
    if (Designation._id) {
      let update = await DesignationSch.findByIdAndUpdate(Designation._id, { $set: Designation });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, DesignationConfig.validationMessage.AddDesignation, null);
    } else {
      // Designation.Added_by = req.user.id;
      let newDesignation = new DesignationSch(Designation);
      await newDesignation.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newDesignation, null, DesignationConfig.validationMessage.AddDesignation, null);
    }
  } catch (err) {
    next(err);
  }
};

DesignationController.deletebyID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Designation = await DesignationSch.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, Designation, null, DesignationConfig.validationMessage.DeleteByID, null);
  } catch (err) {
    next(err);
  }
};

module.exports = DesignationController;
