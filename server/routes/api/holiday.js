const express = require('express');
const router = express.Router();

const holidayModule = require('./../../modules/holidaylist/holidayController').holidayController;

const { authorization, authentication } = require('../../middleware/authentication.middleware');

const holidayValidation = require('./../../modules/holidaylist/holidayValidation');

router.get('/', authorization, authentication, holidayModule.getData);
router.get('/:id', authorization, authentication, holidayModule.getDataByID);
router.post('/', authorization, authentication, holidayValidation.sanitize, holidayValidation.validate, holidayValidation.duplicateValidation, holidayModule.saveData);
router.delete('/:id', authorization, authentication,holidayModule.deleteById);

module.exports = router;
