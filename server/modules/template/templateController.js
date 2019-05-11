const httpStatus = require('http-status');
const templateSch = require('./templateSchema');
const otherHelper = require('../../helper/others.helper');
const templateConfig = require('./templateConfig');
const isEmpty = require('../../validation/isEmpty');
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
    const template = await templateSch.findOne({ template_key, is_deleted: false }, 'template_name template_key information variables from subject body alternate_text updated_by updated_at');

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
    const { _id, template_name, template_key, information, variables, from, subject, alternate_text, body } = req.body;

    // if (_id) {
    const update = await templateSch.findOneAndUpdate(
      { _id, template_name, template_key },
      {
        $set: {
          template_name,
          template_key,
          information,
          variables,
          from,
          subject,
          alternate_text,
          body,
          updated_by: req.user.id,
          updated_at: Date.now(),
        },
      },
    );

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

internal.renderTemplate = async (template_key, variables_OBJ, toEmail) => {
  if (isEmpty(template_key) || isEmpty(variables_OBJ) || isEmpty(toEmail)) {
    return { error: 'Empty Data' };
  }
  const unrendered = await templateSch.findOne({ template_key });
  if (isEmpty(unrendered)) {
    return { error: 'Invalid Template Key' };
  }
  let from = unrendered.from + '';
  let body = unrendered.body + '';
  let subject = unrendered.subject + '';
  let alternate_text = unrendered.alternate_text + '';
  let variables_keys = Object.keys(variables_OBJ);

  for (let i = 0; i < variables_keys.length; i++) {
    let re = new RegExp(`%${variables_keys[i]}%`, 'g');
    subject = subject.replace(re, variables_OBJ[variables_keys[i]]);
    body = body.replace(re, variables_OBJ[variables_keys[i]]);
    alternate_text = alternate_text.replace(re, variables_OBJ[variables_keys[i]]);
  }
  return { from, subject, html: body, text: alternate_text, to: toEmail };
};

module.exports = { templateController, internal };
