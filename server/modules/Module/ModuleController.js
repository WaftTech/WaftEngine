const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const moduleConfig = require('./config');
const ModuleSch = require('./Module');
const moduleController = {};
const internal = {};

internal.checkField = (res, k, v) => {
  console.log('Field', k, '-', v);
  const fieldTypes = Object.keys(moduleConfig.fieldType);
  if (!v.label) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, `${k} field must have label`);
  }
  if (!v.type) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, `${k} field must have type`);
  } else if (!fieldTypes.includes(v.type)) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, `${k} field must have valid type`);
  }
};
internal.checkSection = (res, k, v) => {
  console.log('Section', k, '-', v);
  if (!v.name) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, 'Section must have label name');
  }
  if (!v.layout) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, 'Section must have layout selected');
  } else if (!moduleConfig.section.layout.includes(v.layout)) {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, 'Section must have valid layout selected');
  }
  if (v.fields && v.fields.length) {
    v.fields.forEach((elem, index) => {
      for (let [k1, v1] of Object.entries(elem)) {
        if (v1.type === 'Section') {
          internal.checkSection(res, k1, v1);
        } else {
          internal.checkField(res, k1, v1);
        }
      }
    });
  } else {
    return otherHelper.sendResponse(res, HttpStatus.FAILED_DEPENDENCY, false, null, 'Section must have at least one field');
  }
};
moduleController.getFieldConfig = async (req, res, next) => {
  console.log(1);
  return otherHelper.sendResponse(res, HttpStatus.OK, true, moduleConfig, null, 'Module Config', null);
};
moduleController.validateModuleConfig = async (req, res, next) => {
  try {
    const section = req.body.section;
    section.forEach((elem, index) => {
      for (let [k, v] of Object.entries(elem)) {
        if (v.type === 'Section') {
          internal.checkSection(res, k, v);
        } else {
          internal.checkField(res, k, v);
        }
      }
    });
    return next();
    console.log(1);
  } catch (err) {
    console.log(err);
    next(err);
    return err;
  }
};

moduleController.saveModuleConfig = async (req, res, next) => {
  try {
    const module_key = req.params.name;
    const {
      body: { module_name, _id, is_active, section },
    } = req;

    console.log(2);
    let response;
    let moduleSch = await ModuleSch.findOne({ module_key: module_key });
    if (moduleSch && moduleSch._id) {
      moduleSch.module_name = module_name;
      moduleSch.module_key = module_key;
      moduleSch.is_active = is_active;
      moduleSch.section = section;
      response = await moduleSch.save();
    } else {
      const moduleSch = new ModuleSch({
        module_name: module_name,
        module_key: module_key,
        is_active: is_active,
        section: section,
        added_on: new Date(),
      });
      response = await moduleSch.save();
    }
    return otherHelper.sendResponse(res, HttpStatus.OK, true, response, null, `${module_name} Module Setting Saved`, null);
    // return otherHelper.sendResponse(res, HttpStatus.OK, true, req.body, null, `${module_name} Module Setting Saved`, null);
  } catch (err) {
    return err;
  }
};
moduleController.getModules = async (req, res, next) => {
  try {
    let moduleSch = await ModuleSch.find({}, (err, res) => {});
    return otherHelper.sendResponse(res, HttpStatus.OK, true, moduleSch, null, `Module List Get Success`, null);
  } catch (err) {
    return err;
  }
};
moduleController.getModuleConfig = async (req, res, next) => {
  try {
    const module_key = req.params.name;
    let moduleSch = await ModuleSch.findOne({ module_key: module_key });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, moduleSch, null, `${module_key} Module Setting Get Success`, null);
  } catch (err) {
    return err;
  }
};
module.exports = moduleController;
