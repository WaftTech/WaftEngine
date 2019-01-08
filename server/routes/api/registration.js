const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/registration/' });

const registrationModule = require('./../../modules/registration/registrationController');

const { authorization, authentication } = require('../../middleware/authentication.middleware');

const registrationValidation = require('./../../modules/registration/registrationValidation');

router.get('/', authorization, authentication, registrationModule.getData);
router.get('/:id', authorization, authentication, registrationModule.getDataByID);
router.post('/', authorization, authentication, upload.array('file', 1), registrationValidation.sanitize, registrationValidation.validate, registrationValidation.duplicateValidation, registrationModule.saveData);
router.delete('/:id', authorization, authentication, registrationModule.deleteById);

module.exports = router;
