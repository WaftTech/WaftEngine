const express = require('express');
const router = express.Router();
const settingModule = require('../../modules/setting/settingController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
router.get('/', authorization, authentication, settingModule.GetSetting);
router.post('/all', authorization, settingModule.EditSetting);
router.post('/', authorization, authentication, settingModule.SaveSetting);
module.exports = router;
