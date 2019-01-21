const HttpStatus = require('http-status');
const objectId = require('mongoose').Types.ObjectId;
const CompanySch = require('./company');
const otherHelper = require('../../helper/others.helper');
const { SetCache, FlushAll } = require('../../middleware/caching.middleware');
const companyConfig = require('./companyConfig');
const companyController = {};

companyController.GetCompany = async (req, res, next) => {
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
  if (req.query.find_Name) {
    searchq = { Name: { $regex: req.query.find_Name, $options: 'i x' }, ...searchq };
  }
  selectq = ('Name Image Description', { IsDeleted: false });
  let companydata = await otherHelper.getquerySendResponse(CompanySch, page, size, sortquery, searchq, selectq, '', next);
  SetCache(req, { ...companydata, msg: companyConfig.getCompanies, page, size, success: true });
  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, companydata.data, companyConfig.getCompanies, page, size, companydata.totaldata);
};
companyController.GetCompanyName = async (req, res, next) => {
  const company = await CompanySch.find({ IsDeleted: false }, { Name: 1 });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, company, null, companyConfig.getCompanyName, null);
};
companyController.SaveCompany = async (req, res, next) => {
  try {
    FlushAll();
    let company = req.body;
    if (company._id) {
      if (req.file && req.file) {
        company.Image = req.file;
      }
      const update = await CompanySch.findByIdAndUpdate(company._id, { $set: company });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, companyConfig.saveCompany, null);
    } else {
      company.Image = req.file;
      // company.Added_by = req.user.id;
      const newCompany = new CompanySch(company);
      const CompanySave = await newCompany.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, CompanySave, null, companyConfig.saveCompany, null);
    }
  } catch (err) {
    next(err);
  }
};
companyController.GetCompanyById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const companyDetail = await CompanySch.findOne({ _id: objectId(id), IsDeleted: false, __v: 0 });
    SetCache(req, { data: companyDetail, msg: companyConfig.getCompany, success: true });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, companyDetail, null, companyConfig.getCompany, null);
  } catch (err) {
    next(err);
  }
};
companyController.DeleteCompany = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await CompanySch.findByIdAndUpdate(objectId(id), { $set: { IsDeleted: true, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, companyConfig.deleteCompany, null);
  } catch (err) {
    next(err);
  }
};
module.exports = companyController;
