const HttpStatus = require('http-status');
//var DesignationId = require('mongoose').Types.postId;
const otherHelper = require('../../helper/others.helper');
const DesignationSch = require('./Designation');
const DesignationController = {};

DesignationController.GetDesignation = async (req, res, next) => {
  if (req.query.search) {
    let searchvars = req.query.search.split('_');
    searchfield = searchvars[0];
    searchkey = searchvars[1];
    searchquery = { [searchfield]: { $regex: searchkey, $options: 'i' } };
  } else {
    searchquery = {};
  }

  let designation = await DesignationSch.find({ ...searchquery, IsDeleted: false });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, designation, null, 'Designation Get Success !!', null, 'Designation Not Found');
};

DesignationController.GetDesignationDetail = async (req, res, next) => {
  //let id = req.params.id;
  let designation = await DesignationSch.findById(req.params.id);
  return otherHelper.sendResponse(res, HttpStatus.OK, true, designation, null, 'Designation Get Success !!', null, 'Designation Not Found');
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

DesignationController.DeleteDesignation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Designation = await DesignationSch.findByIdAndUpdate(ObjectId(id), { $set: { IsDeleted: true, Deleted_by: req.user.id, Deleted_at: new Date() } });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, media, null, 'Designation Get Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = DesignationController;
