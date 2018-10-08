const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Organization/organizationController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetOrganization);
router.post('/', dModule.SaveOrganization);
router.get('/:slug', dModule.GetOrganizationDetail);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
