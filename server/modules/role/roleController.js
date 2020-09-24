const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const roleSch = require('./roleSchema');
const moduleSch = require('./moduleSchema');
const moduleGroupSch = require('./moduleGroupSchema');
const accessSch = require('./accessSchema');
const roleConfig = require('./roleConfig');
const roleController = {};

roleController.GetRoles = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    if (req.query.page && req.query.page == 0) {
      selectQuery = 'role_title description is_active is_deleted';
      const roles = await roleSch.find(searchQuery).select(selectQuery);
      return otherHelper.sendResponse(res, httpStatus.OK, true, roles, null, 'all roles get success!!', null);
    }
    if (req.query.find_role_title) {
      searchQuery = { role_title: { $regex: req.query.find_role_title, $options: 'i' }, ...searchQuery };
    }

    if (req.query.is_active) {
      searchQuery = { is_active: true, ...searchQuery };
    }

    let datas = await otherHelper.getquerySendResponse(roleSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, roleConfig.roleGet, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
roleController.GetRoleDetail = async (req, res, next) => {
  const roles = await roleSch.findById(req.params.id, { is_active: 1, role_title: 1, description: 1 });
  return otherHelper.sendResponse(res, httpStatus.OK, true, roles, null, roleConfig.roleGet, null, 'Role Not Found');
};
roleController.AddRoles = async (req, res, next) => {
  try {
    const role = req.body;
    if (role._id) {
      const update = await roleSch.findByIdAndUpdate(role._id, { $set: role }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.roleSave, null);
    } else {
      role.added_by = req.user.id;
      const newRole = new roleSch(role);
      await newRole.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newRole, null, roleConfig.roleSave, null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.DeleteRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await roleSch.findByIdAndUpdate(id, { $set: { is_deleted: true, deleted_at: new Date() } });
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'role delete success', null);
  } catch (err) {
    next(err);
  }
};
roleController.GetModule = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);

    selectQuery = 'module_name description order path module_group';
    if (req.query.find_module_name) {
      searchQuery = { module_name: { $regex: req.query.find_module_name, $options: 'i' }, ...searchQuery };
    }
    populate = {
      path: 'module_group',
      select: 'module_group',
    };
    let datas = await otherHelper.getquerySendResponse(moduleSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, roleConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
roleController.GetModuleDetail = async (req, res, next) => {
  const modules = await moduleSch.findById(req.params.id);
  return otherHelper.sendResponse(res, httpStatus.OK, true, modules, null, roleConfig.moduleGet, null, 'Module Not Found');
};
roleController.GetModuleGroup = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, null);

    selectQuery = 'module_group module_group_main description order path';

    if (req.query.find_module_name) {
      searchQuery = { module_name: { $regex: req.query.find_module_name, $options: 'i' }, ...searchQuery };
    }
    let datas = await otherHelper.getquerySendResponse(moduleGroupSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, datas.data, roleConfig.gets, page, size, datas.totaldata);
  } catch (err) {
    next(err);
  }
};
roleController.GetModuleGroupDetail = async (req, res, next) => {
  const modules = await moduleGroupSch.findById(req.params.id);
  return otherHelper.sendResponse(res, httpStatus.OK, true, modules, null, roleConfig.moduleGet, null, 'Module Not Found');
};
roleController.AddModuleList = async (req, res, next) => {
  try {
    const modules = req.body;
    if (modules._id) {
      const update = await moduleSch.findByIdAndUpdate(modules._id, { $set: modules }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.moduleSave, null);
    } else {
      modules.added_by = req.user.id;
      const newModules = new moduleSch(modules);
      await newModules.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newModules, null, roleConfig.moduleSave, null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.AddModuleGroupList = async (req, res, next) => {
  try {
    const moduleGroup = req.body;
    if (moduleGroup._id) {
      const update = await moduleGroupSch.findByIdAndUpdate(moduleGroup._id, { $set: moduleGroup }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.moduleSave, null);
    } else {
      moduleGroup.added_by = req.user.id;
      const newModuleGroup = new moduleGroupSch(moduleGroup);
      await newModuleGroup.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newModuleGroup, null, roleConfig.moduleSave, null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.GetAccessList = async (req, res, next) => {
  try {
    const access = await accessSch.find({}, { _id: 1, is_active: 1, access_type: 1, module_id: 1, role_id: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, access, null, roleConfig.accessGet, null, 'Access Not Found');
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessList = async (req, res, next) => {
  try {
    const access = req.body;
    if (access._id) {
      const update = await accessSch.findByIdAndUpdate(access._id, { $set: access }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, roleConfig.accessSave, null);
    } else {
      access.added_by = req.user.id;
      const newModules = new accessSch(access);
      await newModules.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newModules, null, roleConfig.accessSave, null);
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
          access[i].role_id = roleid;
          await accessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
        } else {
          access[i].role_id = roleid;
          access[i].added_by = req.user.id;
          const newAccess = new accessSch(access[i]);
          await newAccess.save();
        }
      }
      return otherHelper.sendResponse(res, httpStatus.NOT_MODIFIED, false, access, null, roleConfig.accessSave, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_MODIFIED, false, null, 'Nothing to save!!', 'Nothing to save!!', null);
    }
  } catch (err) {
    next(err);
  }
};
roleController.SaveAccessListForModule = async (req, res, next) => {
  try {
    const moduleid = req.params.moduleid;
    const access = req.body.Access;
    let d = [];
    if (access.length) {
      for (let i = 0; i < access.length; i++) {
        if (access[i]._id) {
          access[i].module_id = moduleid;
          const newAccess = await accessSch.findByIdAndUpdate(access[i]._id, { $set: access[i] }, { new: true });
          d.push(newAccess);
        } else {
          access[i].module_id = moduleid;
          access[i].added_by = req.user.id;
          const newAccess = new accessSch(access[i]);
          const data = await newAccess.save();
          d.push(data);
        }
      }
      return otherHelper.sendResponse(res, httpStatus.OK, true, d, null, 'Access update success!!', null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_MODIFIED, true, update, null, '', null);
    }
  } catch (err) {
    next(err);
  }
};

roleController.GetAccessListForRole = async (req, res, next) => {
  try {
    const roleid = req.params.roleid;
    const AccessForRole = await accessSch.find({ role_id: roleid }, { _id: 1, access_type: 1, is_active: 1, module_id: 1, role_id: 1 });
    const ModulesForRole = await moduleSch.find({}, { _id: 1, module_name: 1, 'path.access_type': 1, 'path._id': 1 });
    const Roles = await roleSch.find({}, { _id: 1, role_title: 1, is_active: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { Access: AccessForRole, Module: ModulesForRole, Roles: Roles }, null, 'Access Get Success !!', null);
  } catch (err) {
    next(err);
  }
};
roleController.GetAccessListForModule = async (req, res, next) => {
  try {
    const moduleid = req.params.moduleid;
    const AccessForModule = await accessSch.find({ module_id: moduleid }, { _id: 1, access_type: 1, is_active: 1, module_id: 1, role_id: 1 });
    const ModulesForRole = await moduleSch.findOne({ _id: moduleid }, { _id: 1, module_name: 1, 'path.access_type': 1, 'path._id': 1 });
    const Roles = await roleSch.find({ is_deleted: false }, { _id: 1, role_title: 1, is_active: 1 });
    return otherHelper.sendResponse(res, httpStatus.OK, true, { Access: AccessForModule, Module: ModulesForRole, Roles: Roles }, null, roleConfig.accessGet, null);
  } catch (err) {
    next(err);
  }
};

module.exports = roleController;
