const httpStatus = require('http-status');
const templateSch = require('./templateSchema');
const otherHelper = require('../../helper/others.helper');
const templateConfig = require('./templateConfig');
const templateController = {};
const internal = {};

templateController.getTemplateName = async (req, res, next) => {
  try {
    const names = await templateSch.find().select('template_name template_key');
    return otherHelper.sendResponse(res, httpStatus.OK, true, names, null, templateConfig.namesGet, null);
  } catch (err) {
    next(err);
  }
};

templateController.getTemplateDetail = async (req, res, next) => {
  try {
    const template_key = req.params.key;
    const template = await templateSch.findOne({ template_key, is_deleted: false }, 'template_name template_key information variables from subject body updated_by updated_at');

    if (template) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, template, null, templateConfig.templateGet, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, templateConfig.templateNotFound, null);
    }
  } catch (err) {
    next(err);
  }
};

templateController.postTemplate = async (req, res, next) => {
  try {
    const { _id, template_name, template_key, information, variables, from, subject, body } = req.body;

    // if (_id) {
    const update = await templateSch.findOneAndUpdate({ _id, template_name, template_key }, { $set: { template_name, template_key, information, variables, from, subject, body, updated_by: req.user.id, updated_at: Date.now() } });

    if (update) {
      return otherHelper.sendResponse(res, httpStatus.OK, true, req.body, null, templateConfig.templateSave, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, templateConfig.templateNotFound, null);
    }
    // } else {
    //   const tmeplate = new templateSch({ template_name, template_key, information, variables, from, subject, body });
    //   const template = tmeplate.save();
    //   return otherHelper.sendResponse(res, httpStatus.OK, true, template, null, templateConfig.templateSave, null);
    // }
  } catch (err) {
    next(err);
  }
};

internal.renderTemplate = async (template_key, variables) => {
  const unrendered = await templateSch.findOne({ template_key });
  let from = unrendered.from + '';
  let body = unrendered.body + '';
  let subject = unrendered.subject + '';
  let variables_keys = Object.keys(variables);

  for (let i = 0; i < variables_keys.length; i++) {
    subject = subject.replace(`%${variables_keys[i]}%`, variables[variables_keys[i]]);
    body = body.replace(`%${variables_keys[i]}%`, variables[variables_keys[i]]);
  }
  return { from, subject, body };
};

module.exports = { templateController, internal };
