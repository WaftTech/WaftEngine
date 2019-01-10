const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const RoleSch = require('./role');
const ModuleSch = require('./module');
const AccessSch = require('./access');
const config = require('./roleConfig');
const roleController = {};

roleController.GetRoles = async (req, res, next) => {
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

  if (req.query.find_RolesTitle) {
    searchq = { RolesTitle: { $regex: req.query.find_RolesTitle, $options: 'i x' }, ...searchq };
  }
  selectq = 'RolesTitle Description IsActive';

  let datas = await otherHelper.getquerySendResponse(RoleSch, page, size, sortq, searchq, selectq, next, '');

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, config.roleGet, page, size, datas.totaldata);
};
roleController.GetRoleDetail = async (req, res, next) => {
  const roles = await RoleSch.findById(req.params.id, { IsActive: 1, RolesTitle: 1, Description: 1 });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, roles, null, config.roleGet, null, 'Role Not Found');
};
roleController.AddRoles = async (req, res, next) => {
  try {
    const role = req.body;
    if (role._id) {
      const update = await RoleSch.findByIdAndUpdate(role._id, { $set: role }, { new: true });
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

  if (req.query.find_ModuleName) {
    searchq = { ModuleName: { $regex: req.query.find_ModuleName, $options: 'i x' }, ...searchq };
  }
  selectq = 'ModuleName Description Order Path';

  let datas = await otherHelper.getquerySendResponse(ModuleSch, page, size, sortq, searchq, selectq, next, '');

  return otherHelper.paginationSendResponse(res, HttpStatus.OK, true, datas.data, config.gets, page, size, datas.totaldata);
};
roleController.GetModuleDetail = async (req, res, next) => {
  const modules = await ModuleSch.findById(req.params.id);
  return otherHelper.sendResponse(res, HttpStatus.OK, true, modules, null, config.moduleGet, null, 'Module Not Found');
};
roleController.AddModulList = async (req, res, next) => {
  try {
    const modules = req.body;
    if (modules._id) {
      const update = await ModuleSch.findByIdAndUpdate(modules._id, { $set: modules }, { new: true });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, config.moduleSave, null);
    } else {
      modules.Added_by = req.user.id;
      const newModules = new ModuleSch(modules);
      await newModules.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newModules, null, config.moduleSave, null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.getAccessList = async (req, res, next) => {
  try {
    const access = await AccessSch.find({}, { _id: 1, IsActive: 1, AccessType: 1, ModuleId: 1, RoleId: 1 });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, access, null, config.accessGet, null, 'Access Not Found');
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessList = async (req, res, next) => {
  try {
    const access = req.body;
    if (access._id) {
      const update = await AccessSch.findByIdAndUpdate(access._id, { $set: access }, { new: true });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, config.accessSave, null);
    } else {
      access.Added_by = req.user.id;
      const newModules = new AccessSch(access);
      await newModules.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, newModules, null, config.accessSave, null);
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
          await AccessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
        } else {
          access[i].RoleId = roleid;
          access[i].Added_by = req.user.id;
          const newAccess = new AccessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, access, null, config.accessSave, null);
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
          await AccessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
        } else {
          access[i].ModuleId = moduleid;
          access[i].Added_by = req.user.id;
          const newAccess = new AccessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, HttpStatus.NOT_MODIFIED, false, access, null, config.accessSave, null);
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
    return otherHelper.sendResponse(res, HttpStatus.OK, true, { Access: AccessForModule, Module: ModulesForRole, Roles: Roles }, null, config.accessGet, null);
  } catch (err) {
    next(err);
  }
};

module.exports = roleController;
