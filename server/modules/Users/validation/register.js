const Validator = require('validator');
const isEmpty = require('../../../validation/isEmpty');

const validateRegisterInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  !Validator.isLength(data.name, { min: 2, max: 30 })
    ? (errors.name = 'Name must be between 2 to 30 characters')
    : null;
  !Validator.isLength(data.password, { min: 6, max: 30 })
    ? (errors.password =
        'password must be atleast 6 characters, max limit 30 characters')
    : null;
  !Validator.equals(data.password, data.password2)
    ? (errors.password2 = 'Passwords must match')
    : null;
  Validator.isEmpty(data.name)
    ? (errors.name = 'Name field is required')
    : null;
  Validator.isEmpty(data.email)
    ? (errors.email = 'Email field is required')
    : null;
  !Validator.isEmail(data.email) ? (errors.email = 'Email is invalid') : null;
  Validator.isEmpty(data.password)
    ? (errors.password = 'Password field is required')
    : null;
  Validator.isEmpty(data.password2)
    ? (errors.password2 = 'Confirm Password is required')
    : null;

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
