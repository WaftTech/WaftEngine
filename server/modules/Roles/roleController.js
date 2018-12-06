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
roleController.GetRoleDetail = async (req, res, next) => {
  const roles = await RoleSch.findById(req.params.id, { _id: 1, IsActive: 1, RolesTitle: 1, Description: 1 });
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
roleController.GetModuleDetail = async (req, res, next) => {
  const modules = await ModuleSch.findById(req.params.id);
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
    const access = await AccessSch.find({}, { _id: 1, IsActive: 1, AccessType: 1, ModuleId: 1, RoleId: 1 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, access, null, 'Access Get Success !!', null, 'Access Not Found');
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessList = async (req, res, next) => {
  try {
    const access = req.body;
    if (access._id) {
      const update = await AccessSch.findByIdAndUpdate(access._id, { $set: access });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Access Saved Success !!', null);
    } else {
      access.Added_by = req.user.id;
      const newModules = new AccessSch(access);
      await newModules.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newModules, null, 'Access Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessListFromRole = async (req, res, next) => {
  try {
    const roleid = req.params.roleid;
    const access = req.body.Access;
    if (access.length) {
      for (let i = 0; i < access.length; i++) {
        if (access[i]._id) {
          access[i].RoleId = roleid;
          await AccessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] });
        } else {
          access[i].RoleId = roleid;
          access[i].Added_by = req.user.id;
          const newAccess = new AccessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, access, null, 'Save Sucess!!', null);
    } else {
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, null, 'Nothing to save!!', 'Nothing to save!!', null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessListForModule = async (req, res, next) => {
  try {
    const moduleid = req.params.moduleid;
    const access = req.body.Access;
    if (access.length) {
      for (let i = 0; i < access.length; i++) {
        if (access[i]._id) {
          access[i].ModuleId = moduleid;
          await AccessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] });
        } else {
          access[i].ModuleId = moduleid;
          access[i].Added_by = req.user.id;
          const newAccess = new AccessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, access, null, 'Save Sucess!!', null);
    } else {
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, null, 'Nothing to save!!', 'Nothing to save!!', null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.getAccessListForRole = async (req, res, next) => {
  try {
    const roleid = req.params.roleid;
    const AccessForRole = await AccessSch.find({ RoleId: roleid }, { _id: 1, AccessType: 1, IsActive: 1, ModuleId: 1, RoleId: 1 });
    const ModulesForRole = await ModuleSch.find({}, { _id: 1, ModuleName: 1, 'Path.AccessType': 1, 'Path._id': 1 });
    const Roles = await RoleSch.find({}, { _id: 1, RolesTitle: 1, IsActive: 1 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { Access: AccessForRole, Module: ModulesForRole, Roles: Roles }, null, 'Access Get Success !!', null);
  } catch (err) {
    next(err);
  }
};
roleController.getAccessListForModule = async (req, res, next) => {
  try {
    const moduleid = req.params.moduleid;
    const AccessForModule = await AccessSch.find({ ModuleId: moduleid }, { _id: 1, AccessType: 1, IsActive: 1, ModuleId: 1, RoleId: 1 });
    const ModulesForRole = await ModuleSch.findOne({ _id: moduleid }, { _id: 1, ModuleName: 1, 'Path.AccessType': 1, 'Path._id': 1 });
    const Roles = await RoleSch.find({}, { _id: 1, RolesTitle: 1, IsActive: 1 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { Access: AccessForModule, Module: ModulesForRole, Roles: Roles }, null, 'Access Get Success !!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = roleController;
