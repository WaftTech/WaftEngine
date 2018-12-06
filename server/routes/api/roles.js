const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Roles/roleController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/role', authorization, dModule.GetRoles);
router.get('/role/:id', authorization, dModule.GetRoleDetail);
router.post('/role', authorization, dModule.AddRoles);
router.get('/module', authorization, dModule.GetModule);
router.get('/module/:id', authorization, dModule.GetModuleDetail);
router.post('/module', authorization, dModule.AddModulList);

router.get('/access', authorization, dModule.getAccessList);
router.post('/access', authorization, dModule.SaveAccessList);

/**
 * Access Management of Role to all Module
 */
router.get('/access/role/:roleid', authorization, dModule.getAccessListForRole);
router.post('/access/role/:roleid', authorization, dModule.SaveAccessListFromRole);

/**
 *Access Management of Module to all roles
 */
router.get('/access/module/:moduleid', authorization, dModule.getAccessListForModule);
router.post('/access/module/:moduleid', authorization, dModule.SaveAccessListForModule);

module.exports = router;
