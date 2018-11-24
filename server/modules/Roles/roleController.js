const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const RoleSch = require('./role');
const ModuleSch = require('./module');
const AccessSch = require('./access');
const roleController = {};

roleController.GetRoles = async (req, res, next) => {
  const roles = await RoleSch.find({}, { _id: 1, IsActive: 1, RolesTitle: 1, Description: 1 });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, roles, null, 'Role Get Success !!', null, 'Role Not Found');
};
roleController.AddRoles = async (req, res, next) => {
  try {
    const role = req.body;
    if (role._id) {
      const update = await RoleSch.findByIdAndUpdate(role._id, { $set: role });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Role Saved Success !!', null);
    } else {
      role.Added_by = req.user.id;
      const newRole = new RoleSch(role);
      await newRole.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newRole, null, 'Role Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.GetModule = async (req, res, next) => {
  const modules = await ModuleSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, modules, null, 'Modules Get Success !!', null, 'Module Not Found');
};
roleController.AddModulList = async (req, res, next) => {
  try {
    const modules = req.body;
    if (modules._id) {
      const update = await ModuleSch.findByIdAndUpdate(modules._id, { $set: modules });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Module Saved Success !!', null);
    } else {
      modules.Added_by = req.user.id;
      const newModules = new ModuleSch(modules);
      await newModules.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newModules, null, 'Module Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.getAccessList = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessList = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = roleController;
