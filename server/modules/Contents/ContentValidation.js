const isEmpty = require('../../validation/isEmpty');
const otherHelper = require('../../helper/others.helper');
const HttpStatus = require('http-status');

const { validate } = require('./../../helper/validate.helper');

const ContentConfig = require('./ContentConfig');

const ContentValidation = {};

ContentValidation.validate = async (req, res, next) => {
  let errors = await validate(req.body, [
    {
      field: 'ContentName',
      validate: [
        {
          condition: 'IsEmpty',
          msg: ContentConfig.ValidationMessage.ContentNameRequired,
        },
      ],
    },
    {
      field: 'Key',
      validate: [
        {
          condition: 'IsEmpty',
          msg: ContentConfig.ValidationMessage.KeyRequired,
        },
      ],
    },
    {
      field: 'Description',
      validate: [
        {
          condition: 'IsEmpty',
          msg: ContentConfig.ValidationMessage.DescriptionRequired,
        },
      ],
    },
    {
      field: 'PublishFrom',
      validate: [
        {
          condition: 'IsEmpty',
          msg: ContentConfig.ValidationMessage.PublishFromRequired,
        },
        {
          condition: 'IsDate',
          msg: ContentConfig.ValidationMessage.PublishToInvalid,
        },
      ],
    },
    {
      field: 'PublishTo',
      validate: [
        {
          condition: 'IsEmpty',
          msg: ContentConfig.ValidationMessage.PublishToRequired,
        },
        {
          condition: 'IsDate',
          msg: ContentConfig.ValidationMessage.PublishFromInvalid,
        },
      ],
    },
  ]);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST, false, null, errors, 'Validation Error.', null);
  } else {
    return next();
  }
};
module.exports = ContentValidation;

//contents history
