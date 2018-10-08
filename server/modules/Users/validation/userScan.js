const Validator = require('validator');
const isEmpty = require('../../../validation/isEmpty');

const validateUserScanInput = data => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  !Validator.isEmail(data.email) ? (errors.email = 'Email is invalid') : null;
  Validator.isEmpty(data.email)
    ? (errors.email = 'Email field is required')
    : null;

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateUserScanInput;
