const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const BranchModel = require('./Branch');
const BranchConfig = require('./BranchConfig');
const BranchController = {};

BranchController.GetBranch = async (req, res, next) => {
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
  if (req.query.find_BranchName) {
    searchquery = { BranchName: { $regex: req.query.find_BranchName, $options: 'i x' }, ...searchquery };
  }

  if (req.query.find_Address) {
    searchquery = { Address: { $regex: req.query.find_Address, $options: 'i x' }, ...searchquery };
  }

  if (req.query.find_ContactNo) {
    searchquery = { ContactNo: { $regex: req.query.find_ContactNo, $options: 'i x' }, ...searchquery };
  }

  if (req.query.find_Email) {
    searchquery = { Email: { $regex: req.query.find_Email, $options: 'i x' }, ...searchquery };
  }

  selectquery = 'BranchName BranchNameNepali Address ContactNo Email';

  let datas = await otherHelper.getquerySendResponse(BranchModel, page, size, sortquery, searchquery, selectquery, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, BranchConfig.validationMessage.GetBranch, page, size, datas.totaldata);
};

BranchController.GetBranchDetail = async (req, res, next) => {
  try {
    let data = await BranchModel.findOne({ _id: req.params.id, IsDeleted: false }).select('BranchName BranchNameNepali Address ContactNo Email');
    // console.log('data:', data);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, BranchConfig.validationMessage.GetBranch, null);
  } catch (err) {
    next(err);
  }
};

BranchController.AddBranch = async (req, res, next) => {
  try {
    let Branch = req.body;
    Branch.Add_by = req.user.id;
    if (Branch._id) {
      let update = await BranchModel.findByIdAndUpdate(Branch._id, { $set: Branch });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, BranchConfig.validationMessage.AddBranch, null);
    } else {
      // LeaveType.Added_by = req.user.id;
      let newBranch = new BranchModel(Branch);
      await newBranch.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newBranch, null, BranchConfig.validationMessage.AddBranch, null);
    }
  } catch (err) {
    next(err);
  }
};

BranchController.DeleteByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await BranchModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_By: req.user.id, Deleted_At: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, BranchConfig.validationMessage.DeleteByID, null);
  } catch (err) {
    next(err);
  }
};

module.exports = BranchController;
