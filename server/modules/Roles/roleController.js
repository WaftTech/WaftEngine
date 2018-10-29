const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const Roles = require('../../config/roles');
const roleController = {};

roleController.GetRoles = async (req, res, next) => {
  return otherHelper.sendResponse(res, HttpStatus.OK, true, Roles, null, 'Roles Get Success !!', null);
};

module.exports = roleController;
