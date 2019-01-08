const express = require('express');
const router = express.Router();

const companyValidation = require('./../../modules/companyProfile/companyValidator');
const companyModule = require('./../../modules/companyProfile/companyController');

const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, companyModule.getData);
router.post('/', authorization, authentication, companyValidation.sanitize, companyValidation.validate, companyModule.saveData);

module.exports = router;
