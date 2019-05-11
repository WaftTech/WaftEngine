const express = require('express');
const router = express.Router();

const dModule = require('../../modules/module/moduleController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/fields', authorization, authentication, dModule.GetFieldConfig);
router.get('/settings', authorization, authentication, dModule.GetModules);
router.get('/setting/:name', authorization, authentication, dModule.GetModuleConfig);
router.post('/setting/:name', authorization, authentication, dModule.SaveModuleConfig);

module.exports = router;
