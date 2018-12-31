const express = require('express');
const router = express.Router();

const CreateLeaveValidation = require('./../../modules/CreateLeave/CreateLeaveValidation');
const CreateLeaveModule = require('./../../modules/CreateLeave/CreateLeaveController');

const { authorization } = require('../../middleware/authentication.middleware');

router.get('/:fiscalid', authorization, CreateLeaveModule.getData);
router.post('/', authorization, CreateLeaveValidation.sanitize, CreateLeaveValidation.validate, CreateLeaveModule.saveData);

module.exports = router;
