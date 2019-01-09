const express = require("express");
const router = express.Router();

const settingsModule = require('./../../modules/Settings/settingsController').settingsController;

const { authorization } = require('../../middleware/authentication.middleware');

const settingsValidation = require('./../../modules/Settings/settingsValidation');

router.get('/', authorization, settingsModule.getData);
router.get('/:key', authorization, settingsModule.getDataByKey);
router.post('/', authorization,settingsValidation.sanitize, settingsValidation.validate, settingsModule.saveData);

module.exports = router;