const express = require('express');
const router = express.Router();

const holidayModule = require('./../../modules/holidaylist/holidayController').holidayController;

const { authorization } = require('../../middleware/authentication.middleware');

const holidayValidation = require('./../../modules/holidaylist/holidayValidation');

router.get('/', authorization, holidayModule.getData);
router.get('/:id', authorization, holidayModule.getDataByID);
router.post('/', authorization, holidayValidation.sanitize, holidayValidation.validate, holidayValidation.duplicateValidation, holidayModule.saveData);
router.delete('/:id', authorization, holidayModule.deleteById);

module.exports = router;
