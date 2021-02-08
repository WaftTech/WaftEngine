const express = require('express');
const router = express.Router();
const settingModule = require('../../modules/setting/settingController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/all', authentication, authorization, settingModule.GetSettingAll);
router.get('/type/:type', authentication, authorization, settingModule.GetSettingType);
router.get('/single/:setting_id', authentication, settingModule.GetSettingSingle);
router.post('/edit/all', authentication, authorization, settingModule.EditSetting);
router.post('/:type', authentication, authorization, settingModule.SaveSetting);

module.exports = router;
