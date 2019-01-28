const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const moduleConfig = require('./moduleConfig');
const moduleSch = require('./moduleShema');
const moduleController = {};
const internal = {};

internal.ValidateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
internal.CheckField = (res, k, v) => {
  console.log('Field', k, '-', v);
  const fieldTypes = Object.keys(moduleConfig.fieldType);
  if (!v.label) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `'${k}' must have 'label'`);
  }
  if (!v.key) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `'${k}' must have 'key'`);
  }
  if (!v.name) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `'${k}' must have 'name'`);
  }
  v.required = v.required == 'true' ? true : v.required == true ? true : false;
  if (!fieldTypes.includes(k)) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `'${k}' is not valid type`);
  } else {
    switch (k) {
      case 'SingleLine':
        if ('' + v.numberOfCharacter && !isNaN(parseInt(v.numberOfCharacter)) && parseInt(v.numberOfCharacter) < 256) {
          v.numberOfCharacter = parseInt(v.numberOfCharacter);
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'numberOfCharacter' is not found or valid value for label '${v.label}'`);
        }
        break;
      case 'AutoNumberField':
        console.log('v.startingNumber', v.startingNumber);
        if ('' + v.startingNumber && !isNaN(parseInt(v.startingNumber))) {
          v.startingNumber = parseInt(v.startingNumber);
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'startingNumber' is not found or valid value for label '${v.label}'`);
        }
        break;
      case 'MultiLine':
        if ('' + v.numberOfCharacter && !isNaN(parseInt(v.numberOfCharacter))) {
          v.numberOfCharacter = parseInt(v.numberOfCharacter);
        }
        break;
      case 'Email':
        v.duplicate = v.duplicate == 'true' ? true : v.duplicate == true ? true : false;
        break;
      case 'Phone':
        v.duplicate = v.duplicate == 'true' ? true : v.duplicate == true ? true : false;
        break;
      case 'PickList':
        if (v.option && typeof v.option === 'object' && v.option.length > 0) {
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'option' is not found or valid array of string for label '${v.label}'`);
        }
        if (!v.default) {
          //TODO: check value is from option or not
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'default' is not found or valid string for label '${v.label}'`);
        }
        break;
      case 'MultiSelect':
        if (v.option && typeof v.option === 'object' && v.option.length > 0) {
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'option' is not found or valid array of string for label '${v.label}'`);
        }
        if (v.default && typeof v.default === 'object' && v.default.length > -1) {
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'default' is not found or valid array of string for label '${v.label}'`);
        }
        break;
      case 'Date':
        if (v.default) {
        } else {
          //TODO: check value is from option or not
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'default' is not found or valid string for label '${v.label}'`);
        }
        break;
      case 'DateTime':
        if (v.default) {
        } else {
          //TODO: check value is from option or not
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'default' is not found or valid string for label '${v.label}'`);
        }
        break;
      case 'Decimal':
        if ('' + v.default && !isNaN(parseFloat(v.default))) {
          v.default = parseFloat(v.default);
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'default' is not found or valid value for label '${v.label}'`);
        }
        if ('' + v.maxDigit && !isNaN(parseInt(v.maxDigit)) && parseInt(v.maxDigit) <= 16) {
          v.maxDigit = parseInt(v.maxDigit);
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'maxDigit' is not found or valid value or less than 17 for label '${v.label}'`);
        }
        if ('' + v.decimalPlace && !isNaN(parseInt(v.decimalPlace)) && parseInt(v.decimalPlace) <= 9) {
          v.decimalPlace = parseInt(v.decimalPlace);
        } else {
          return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `key 'decimalPlace' is not found or valid value or less than 10 for label '${v.label}'`);
        }
        break;
      case 'LongInteger':
        break;
      case 'Checkbox':
        break;
      case 'URL':
        break;
      case 'Lookup':
        break;
      case 'MultiSelectLookup':
        break;
      case 'User':
        break;
      case 'FileUpload':
        break;
      default:
    }
  }
};
internal.CheckSection = (res, k, v) => {
  console.log('Section', k, '-', v);
  if (!v.name) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `Section must have label name`);
  }
  if (!v.layout) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `Section must have layout selected`);
  } else if (!moduleConfig.section.layout.includes(v.layout)) {
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, `Section must have valid layout selected`);
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
    return otherHelper.sendResponse(res, httpStatus.FAILED_DEPENDENCY, false, null, 'Section must have at least one field');
  }
};
moduleController.GetFieldConfig = async (req, res, next) => {
  return otherHelper.sendResponse(res, httpStatus.OK, true, moduleConfig, null, 'Module Config', null);
};
moduleController.ValidateModuleConfig = async (req, res, next) => {
  try {
    const section = req.body.section;
    section.forEach((elem, index) => {
      for (let [k, v] of Object.entries(elem)) {
        if (k === 'Section') {
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

moduleController.SaveModuleConfig = async (req, res, next) => {
  try {
    const module_key = req.params.name;
    const {
      body: { module_name, _id, is_active, section },
    } = req;
    let response;
    let modulesch = await moduleSch.findOne({ module_key: module_key });
    if (modulesch && modulesch._id) {
      modulesch.module_name = module_name;
      modulesch.module_key = module_key;
      modulesch.is_active = is_active;
      modulesch.section = section;
      response = await modulesch.save();
    } else {
      const moduleSch = new modulesch({
        module_name: module_name,
        module_key: module_key,
        is_active: is_active,
        section: section,
        added_on: new Date(),
      });
      response = await moduleSch.save();
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, response, null, `'${module_name}' Module Setting Saved`, null);
  } catch (err) {
    return err;
  }
};
moduleController.GetModules = async (req, res, next) => {
  try {
    let modulesch = await moduleSch.find({}, (err, res) => {});
    return otherHelper.sendResponse(res, httpStatus.OK, true, modulesch, null, `Module List Get Success`, null);
  } catch (err) {
    return err;
  }
};
moduleController.GetModuleConfig = async (req, res, next) => {
  try {
    const module_key = req.params.name;
    let modulesch = await moduleSch.findOne({ module_key: module_key });
    return otherHelper.sendResponse(res, httpStatus.OK, true, modulesch, null, `${module_key} Module Setting Get Success`, null);
  } catch (err) {
    return err;
  }
};
module.exports = moduleController;
