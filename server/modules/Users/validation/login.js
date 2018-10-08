const Validator = require('validator');
const isEmpty = require('../../../validation/isEmpty');

const validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  !Validator.isEmail(data.email) ? (errors.email = 'Email is invalid') : null;
  Validator.isEmpty(data.email)
    ? (errors.email = 'Email field is required')
    : null;
  Validator.isEmpty(data.password)
    ? (errors.password = 'Password field is required')
    : null;
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateLoginInput;
