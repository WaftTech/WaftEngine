const Validator = require('validator');
const HttpStatus = require('http-status');
const isEmpty = require('../../../validation/isEmpty');
const OtherHelper = require('../../../helper/others.helper');

const validateInput = (req, res, next) => {
    const data = req.body;
    // console.log(1, data);
    let errors = {};

    data.FiscalYear = !isEmpty(data.FiscalYear) ? data.FiscalYear : '';
    data.From = !isEmpty(data.From) ? data.From : '';
    data.To = !isEmpty(data.To) ? data.To : '';
    !Validator.isISO8601(data.From) ? (errors.From = 'Please input the date type data') : null,
    !Validator.isISO8601(data.To) ? (errors.To = 'Please input the date type data') : null,
    Validator.isEmpty(data.FiscalYear) ? (errors.FiscalYear = 'FiscalYear field is required!!') : null;
    Validator.isEmpty(data.From) ? (errors.From = 'From field is required!!') : null;
    Validator.isEmpty(data.To) ? (errors.To = 'To field is required!!') : null;
    if(!isEmpty(errors)){
        return OtherHelper.sendResponse(res, HttpStatus.BAD_REQUEST,false, null, errors, 'input error', null);
    }else{
        next();
    }
};
module.exports = validateInput;