const HttpStatus = require('http-status');
var OblectId = require('mongoose').Types.ObjectId;
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
  if (req.query) {
    let data = req.query;
    console.log('keys:', data.find_FiscalYear);
    let values = Object.keys(data);
    console.log('values:', values);
    let results = values.forEach(value => {
      let result = value.split('_');
      let fields = {};
      if (result[0] == 'find') {
        fields = result[1];
        let searchfields = fields;
        let searchkeys = data[value];
        let searchq = { [searchfields]: { $regex: searchkeys, $options: 'i x' }, IsDeleted: false };
        console.log('searchq:', searchq);
        console.log('fields:', searchfields);
        console.log('keys:', searchkeys);
      }
    });
  }
  console.log('page no:', page);
  console.log('size:', size);

  try {
    const fiscaldata = await FiscalSch.find({ IsDeleted: false }, { IsDeleted: 0, Deleted_at: 0, Deleted_by: 0, CreatedDate: 0, __v: 0 })
      .sort(sortquery)
      .skip((page - 1) * size)
      .limit(size * 1);
    let totaldata = await FiscalSch.countDocuments({});
    console.log('fiscaldata:', fiscaldata);
    return OtherHelper.paginationSendResponse(res, HttpStatus.OK, true, fiscaldata, null, fiscalConfig.getFiscals, page, size, totaldata);
  } catch (err) {
    next(err);
  }
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
  const fiscal = await FiscalSch.findOne({ _id: OblectId(id) }, { CreatedDate: 0, __v: 0 });
  console.log(fiscal);
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, fiscal, null, fiscalConfig.getFiscal, null);
};

FiscalController.DeleteById = async (req, res, next) => {
  const id = req.params.id;
  const data = await FiscalSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
  return OtherHelper.sendResponse(res, HttpStatus.OK, true, data, null, fiscalConfig.deleteFiscal, null);
};
module.exports = FiscalController;
