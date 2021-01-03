const express = require('express');
const router = express.Router();
const settingModule = require('../../modules/setting/settingController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authentication, authorization, settingModule.GetSetting);
router.post('/all', authentication, settingModule.EditSetting);
router.post('/', authentication, authorization, settingModule.SaveSetting);

module.exports = router;
