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
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
