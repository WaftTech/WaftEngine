const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const departmentModel = require('./department');
const departmentConfig = require('./departmentConfig');
const departmentController = {};

departmentController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    data.addedBy = req.user.id;
    if (data._id) {
      let updated = await departmentModel.findByIdAndUpdate(data._id, data);
      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, departmentConfig.validationMessage.SaveData, null);
    } else {
      let newdata = new departmentModel(data);
      let saved = await newdata.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, departmentConfig.validationMessage.AddData, null);
    }
  } catch (err) {
    next(err);
  }
};

departmentController.getData = async (req, res, next) => {
  const size_default = 10;
  let page;
  let size;
  let searchq;
  let sortq;
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
    console.log(sortfield);
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
  searchq = { IsDeleted: false };

  if (req.query.find_departmentName) {
    searchq = {
      departmentName: { $regex: req.query.find_departmentName, $options: 'i x' },
      ...searchq,
    };
  }
  selectq = 'departmentName departmentNameNepali numberofStaff';

  let datas = await otherHelper.getquerySendResponse(departmentModel, page, size, sortq, searchq, selectq, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, departmentConfig.validationMessage.GetData, page, size, datas.totaldata);
};

departmentController.getDataByID = async (req, res, next) => {
  try {
    let data = await departmentModel.findOne({ _id: req.params.id, IsDeleted: false }).select('departmentName departmentNameNepali numberofStaff');
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, departmentConfig.validationMessage.GetDataByID, null);
  } catch (err) {
    next(err);
  }
};

departmentController.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await departmentModel.findByIdAndUpdate(id, {
      $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() },
    });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, departmentConfig.validationMessage.DeleteById, null);
  } catch (err) {
    next(err);
  }
};

module.exports = departmentController;
