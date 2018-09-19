const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Module/ModuleController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router
  .get('/fields',dModule.getFieldConfig);
 router
//   .get('/:name/setting', dModule.getModuleConfig)
   .post('/:name/setting',  dModule.validateModuleConfig,dModule.saveModuleConfig);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
