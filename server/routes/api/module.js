const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Module/ModuleController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/fields', dModule.GetFieldConfig);
router.get('/settings', dModule.GetModules);
router.get('/setting/:name', dModule.GetModuleConfig);
router.post('/setting/:name', dModule.SaveModuleConfig);

module.exports = router;
