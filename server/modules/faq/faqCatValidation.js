const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const otherHelper = require('../../helper/others.helper');
const faqConfig = require('./faqConfig');
const faqCategorySch = require('./faqCategorySchema');
const faqCatValidation = {};


faqCatValidation.Sanitize = (req, res, next) => {
    const sanitizeArray = [
        {
            field: 'title',
            sanitize: {
                trim: true,
            },
        },
        {
            field: 'slug_url',
            sanitize: {
                trim: true,
            },
        },
        {
            field: 'key',
            sanitize: {
                trim: true,
            },
        },
    ];
    sanitizeHelper.sanitize(req, sanitizeArray);
    next();
};

faqCatValidation.Validation = async (req, res, next) => {
    const validateArray = [
        {
            field: 'title',
            validate: [
                {
                    condition: 'IsEmpty',
                    msg: faqConfig.validate.isEmpty,
                },
                {
                    condition: 'IsLength',
                    msg: faqConfig.validate.isLength,
                },
            ],
        },
        {
            field: 'key',
            validate: [
                {
                    condition: 'IsEmpty',
                    msg: faqConfig.validate.isEmpty,
                }
            ],
        },
    ];
    let errors = validateHelper.validation(req.body, validateArray);

    let key_filter = { is_deleted: false, key: data.key }
    if (data._id) {
        key_filter = { ...key_filter, _id: { $ne: data._id } }
    }
    const already_key = await faqCategorySch.findOne(key_filter);
    if (already_key && already_key._id) {
        errors = { ...errors, key: 'key already exist' }
    }
    if (!isEmpty(errors)) {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, faqConfig.errorIn.inputError, null);
    } else {
        next();
    }
};
module.exports = faqCatValidation;
