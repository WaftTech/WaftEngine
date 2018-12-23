const express = require('express');
const router = express.Router();

const companyValidation = require('./../../modules/companyProfile/companyValidator');
const companyModule = require('./../../modules/companyProfile/companyController');

const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, companyModule.getData);
router.post('/', authorization, companyValidation.sanitize, companyValidation.validate, companyModule.saveData);

module.exports = router;
