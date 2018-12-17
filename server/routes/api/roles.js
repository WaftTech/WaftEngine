const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Roles/roleController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/role', authorization, authentication, dModule.GetRoles);
router.get('/role/:id', authorization, authentication, dModule.GetRoleDetail);
router.post('/role', authorization, authentication, dModule.AddRoles);
router.get('/module', authorization, authentication, dModule.GetModule);
router.get('/module/:id', authorization, authentication, dModule.GetModuleDetail);
router.post('/module', authorization, authentication, dModule.AddModulList);

router.get('/access', authorization, authentication, dModule.getAccessList);
router.post('/access', authorization, authentication, dModule.SaveAccessList);

/**
 * Access Management of Role to all Module
 */
router.get('/access/role/:roleid', authorization, authentication, dModule.getAccessListForRole);
router.post('/access/role/:roleid', authorization, authentication, dModule.SaveAccessListFromRole);

/**
 *Access Management of Module to all roles
 */
router.get('/access/module/:moduleid', authorization, authentication, dModule.getAccessListForModule);
router.post('/access/module/:moduleid', authorization, authentication, dModule.SaveAccessListForModule);

module.exports = router;
