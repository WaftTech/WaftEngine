const express = require("express");
const router = express.Router();

const dModule = require('../../modules/fiscal/fiscalController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validateInput } = require('../../modules/fiscal/fiscalValidation');

router.get('/', authorization, dModule.GetFiscal);
router.post('/', authorization, sanitize, validateInput, dModule.SaveFiscal);
router.get('/:id', authorization, dModule.GetFiscalById);
router.delete('/:id', dModule.DeleteById);

module.exports = router;
