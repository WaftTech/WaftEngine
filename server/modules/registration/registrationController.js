const HttpStatus = require('http-status');
//var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const registrationModel = require('./registration');
const registrationController = {};

registrationController.saveData = async (req, res, next) => {
  try {
    let data = req.body;
    data.Added_by = req.user.id;
    if (data._id) {
      if (req.files && req.files[0]) {
        data.Docuname = req.files;
      }
      let updated = await registrationModel.findByIdAndUpdate(data._id, data);
      return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null, 'Registration updated!!!', null);
    } else {
      //checking if registration no exists
      let status = await registrationModel.findOne({ RegistrationNo: data.RegistrationNo });
      if (status != null) {
        return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, null, 'duplicate registration number', null);
      } else {
        data.Docuname = req.files;
        let newdata = new registrationModel(data);
        let saved = await newdata.save();
        return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, 'Registration successful!!', null);
      }
    }
  } catch (err) {
    next(err);
  }
};

registrationController.getData = async (req, res, next) => {
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
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    size = Math.abs(req.query.page);
  } else {
    size = size_default;
  }
  if (req.query.sort) {
    let sortfield = req.query.sort.slice(1);
    let sortby = req.query.sort.charAt(0);
    if (sortby == 1 && !isNaN(sortby)) {
      //one is ascending
      sortq = sortfield;
    } else if (sortby == 0 && !isNaN(sortby)) {
      //zero is descending
      sortq = '-' + sortfield;
    } else {
      sortq = '';
    }
  }
  // if (req.query.search) {
  //   let searchvars = req.query.search.split('_');
  //   let searchfield = searchvars[0];
  //   let searchkey = searchvars[1];
  //   searchq = { [searchfield]: { $regex: searchkey, $options: 'i x' }, IsDeleted: false };
  // } else {
  //   searchq = {};
  // }

  selectq = 'Subject SenderName ReceiverName RegistrationNo Added_date RegisterDate Remarks Docuname Added_by';

  let datas = await otherHelper.getquerySendResponse(registrationModel, page, size, sortq, searchq, selectq, next);

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, datas.data, 'Registration data delivered successfully!!', page, size, datas.totaldata);
};

registrationController.getDataByID = async (req, res, next) => {
  try {
    let data = await registrationModel.findById(req.params.id);
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration data in detail delivered successfully!!', null);
  } catch (err) {
    next(err);
  }
};

registrationController.deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await registrationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
    //const data = await registrationModel.findByIdAndUpdate(id, { $set: { IsDeleted: true, Deleted_by: "5c0a208c5389c90f64d537fa", Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration delete Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = registrationController;
