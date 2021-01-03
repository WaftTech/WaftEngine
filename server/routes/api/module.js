const express = require('express');
const router = express.Router();

const dModule = require('../../modules/module/moduleController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/fields', authentication, authorization, dModule.GetFieldConfig);
router.get('/settings', authentication, authorization, dModule.GetModules);
router.get('/setting/:name', authentication, authorization, dModule.GetModuleConfig);
router.post('/setting/:name', authentication, authorization, dModule.SaveModuleConfig);

module.exports = router;
