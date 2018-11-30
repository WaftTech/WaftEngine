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
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
