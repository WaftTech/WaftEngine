const express = require('express');
const router = express.Router();

const dModule = require('../../modules/role/roleController');
const validations = require('../../modules/role/roleValidation');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/role', authorization, authentication, dModule.GetRoles);
router.get('/role/:id', authorization, authentication, dModule.GetRoleDetail);
router.post('/role', authorization, authentication, validations.sanitizeRole, validations.validateRole, dModule.AddRoles);
router.get('/module', authorization, dModule.GetModule);
router.get('/module/:id', authorization, dModule.GetModuleDetail);
router.post('/module', authorization, validations.sanitizeModule, validations.validateModule, dModule.AddModulList);

router.get('/access', authorization, dModule.GetAccessList);
router.post('/access', authorization, validations.sanitizeAccess, validations.validateAccess, dModule.SaveAccessList);

/**
 * Access Management of Role to all Module
 */
router.get('/access/role/:roleid', authorization, authentication, dModule.GetAccessListForRole);
router.post('/access/role/:roleid', authorization, authentication, dModule.SaveAccessListFromRole);

/**
 *Access Management of Module to all roles
 */
router.get('/access/module/:moduleid', authorization, dModule.GetAccessListForModule);
router.post('/access/module/:moduleid', authorization, authentication, dModule.SaveAccessListForModule);

module.exports = router;
