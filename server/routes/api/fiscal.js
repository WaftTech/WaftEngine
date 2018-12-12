const express = require('express');
const router = express.Router();

const dModule = require('../../modules/fiscal/fiscalController');
const { authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validateInput } = require('../../modules/fiscal/fiscalValidation');

router.get('/', dModule.GetFiscal);
router.post('/', sanitize, validateInput, dModule.SaveFiscal);
router.get('/:id', dModule.GetFiscalById);

module.exports = router;
