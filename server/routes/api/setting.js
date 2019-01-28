const express = require('express');
const router = express.Router();
const settingModule = require('../../modules/setting/settingController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const validations = require('../../modules/setting/settingValidation');
router.get('/', authorization, settingModule.GetSetting);
router.post('/', authorization, settingModule.SaveSetting);
module.exports = router;
