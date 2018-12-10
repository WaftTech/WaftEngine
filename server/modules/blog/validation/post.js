const Validator = require('validator');
const HttpStatus = require('http-status');
const isEmpty = require('../../../validation/isEmpty');
const otherHelper = require('../../../helper/others.helper');

const validateInput = (req, res, next) => {
    const data = req.body;
    // console.log(1, data);
    let errors = {};

    data.BlogTitle = !isEmpty(data.BlogTitle) ? data.BlogTitle : '';
    data.Description = !isEmpty(data.Description) ? data.Description : '';
    !Validator.isLength(data.BlogTitle, { min: 2, max: 15 }) ? (errors.BlogTitle = 'Title length must be between 2 to 15') : null;
    !Validator.isLength(data.Description, { min: 5, max: 200 }) ? (errors.Description = 'Description length must be between 5 to 200') : null;
    Validator.isEmpty(data.BlogTitle) ? (errors.BlogTitle = 'Title field is required!!') : null;
    Validator.isEmpty(data.Description) ? (errors.Description = 'Description field is required!!') : null;
    if(!isEmpty(errors)){
        return otherHelper.sendResponse(res, HttpStatus.BAD_REQUEST,false, null, errors, 'input error', null);
    }else{
        next();
    }
};
module.exports = validateInput;