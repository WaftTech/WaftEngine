const HttpStatus = require('http-status');
//var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const registrationModel = require('./registration');
const registrationController = {};


registrationController.saveData = async(req, res, next)=>{
    try{
        let data = req.body;
        data.Added_by = req.user.id;
        if(data._id){
            if(req.files && req.files[0]){
                data.Docuname = req.files
            }
            let updated = await registrationModel.findByIdAndUpdate(data._id, data);
            return otherHelper.sendResponse(res, HttpStatus.OK, true, updated, null , 'Registration updated!!!', null);

        }
        else{
            //checking if registration no exists
            let status = await registrationModel.findOne({RegistrationNo: data.RegistrationNo});
            if( status != null){
                return otherHelper.sendResponse(res, HttpStatus.CONFLICT, false, null, null,"duplicate registration number", null);
              }
              else{
                  data.Docuname = req.files;
                  let newdata = new registrationModel(data);
                  let saved = await newdata.save();
                  return otherHelper.sendResponse(res, HttpStatus.OK, true, saved, null, 'Registration successful!!', null);
              }
          }   
      }catch(err){
          next(err);
      }
  };
  
  registrationController.getData = async(req, res, next)=>{
      try{
           let data = await registrationModel.find({IsDeleted: false},{IsDeleted:0,Deleted_by:0,Deleted_at:0});
          return otherHelper.sendResponse(res, HttpStatus.OK, true, data, null, 'Registration data delivered successfully!!', null);
  




/*const HttpStatus = require('http-status');
//var DesignationId = require('mongoose').Types.postId;
const otherHelper = require('../../helper/others.helper');
const DesignationSch = require('./Designation');
const DesignationController = {};

DesignationController.GetDesignation = async (req, res, next) => {
  let page;
  let size;
  let searchquery;
  let selectquery;
  let sortquery;
  const size_default = 5;

  if (req.query.page && !NaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }
};
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

DesignationController.DeleteDesignation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Designation = await DesignationSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, media, null, 'Designation Get Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = DesignationController;*/
