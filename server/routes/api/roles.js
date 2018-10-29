const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Roles/roleController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', authenticationMiddleware.authorization, dModule.GetRoles);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
