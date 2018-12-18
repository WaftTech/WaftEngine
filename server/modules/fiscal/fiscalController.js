const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const OtherHelper = require('../../helper/others.helper');
const fiscalConfig = require('./fiscalConfig');
const FiscalSch = require('./fiscal');
const FiscalController = {};
const internal = {};

FiscalController.GetFiscal = async (req, res, next) => {
  let page;
  let size;
  let searchq;
  let sortquery;
  let selectq;
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

  if (req.query.sort) {
    let sortField = req.query.sort.slice(1);
    let sortBy = req.query.sort.charAt(0);
    if (sortBy == 1 && !isNaN(sortBy)) {
      // 1 is for ascending
      sortquery = sortField;
    } else if (sortBy == 0 && !isNaN(sortBy)) {
      //0 is for descending
      sortquery = '-' + sortField;
    } else {
      sortquery = '';
    }
  }
  searchq = { IsDeleted: false };
  if (req.query.find_fiscalyear) {
    searchq = { FiscalYear: { $regex: req.query.find_fiscalyear, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_from) {
    const dateA = new Date(req.query.find_from);
    let dateB = new Date(req.query.find_from);
    dateB.setDate(dateB.getDate() + 365);
    searchq = { From: { $gte: dateA, $lte: dateB }, ...searchq };
    // console.log(searchq);
  }
  if (req.query.find_to) {
    const dateA = new Date(req.query.find_to);
    let dateB = new Date(req.query.find_to);
    dateB.setDate(dateB.getDate() + 365);
    searchq = { To: { $gte: dateA, $lte: dateB }, ...searchq };
    // console.log(searchq);
  }

  selectq = ('FiscalYear From To', { IsDeleted: false });
  let fiscaldata = await OtherHelper.getquerySendResponse(FiscalSch, page, size, sortquery, searchq, selectq, next);
  return OtherHelper.paginationSendResponse(res, HttpStatus.OK, true, fiscaldata.data, fiscalConfig.getFiscals, page, size, fiscaldata.totaldata);

  // try {
  //   const fiscaldata = await FiscalSch.find({ IsDeleted: false }, { IsDeleted: 0, Deleted_at: 0, Deleted_by: 0, CreatedDate: 0, __v: 0 })
  //     .sort(sortquery)
  //     .skip((page - 1) * size)
  //     .limit(size * 1);
  //   let totaldata = await FiscalSch.countDocuments({ IsDeleted: false });
  //   console.log('fiscaldata:', fiscaldata);
  //   return OtherHelper.paginationSendResponse(res, HttpStatus.OK, fiscaldata, fiscalConfig.getFiscals, page, size, totaldata);
  // } catch (err) {
  //   next(err);
  // }
};

FiscalController.SaveFiscal = async (req, res, next) => {
  try {
    let fiscals = req.body;
    console.log('fiscals', fiscals);
    if (fiscals && fiscals._id) {
      const update = await FiscalSch.findByIdAndUpdate(fiscals._id, {
        $set: fiscals,
      });
      return OtherHelper.sendResponse(res, HttpStatus.OK, true, update, null, fiscalConfig.saveFiscal, null);
    } else {
      const newFiscals = new FiscalSch(fiscals);
      const FiscalSave = await newFiscals.save();
      return OtherHelper.sendResponse(res, HttpStatus.OK, true, FiscalSave, null, fiscalConfig.saveFiscal, null);
    }
  } catch (err) {
    next(err);
  }
};

FiscalController.GetFiscalById = async (req, res, next) => {
  const id = req.params.id;
  const fiscal = await FiscalSch.findOne({ _id: ObjectId(id) }, { CreatedDate: 0, __v: 0 });
  console.log(fiscal);
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, fiscal, null, fiscalConfig.getFiscal, null);
};

FiscalController.DeleteById = async (req, res, next) => {
  const id = req.params.id;
  const data = await FiscalSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_at: new Date() } });
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, data, null, fiscalConfig.deleteFiscal, null);
};
module.exports = FiscalController;
