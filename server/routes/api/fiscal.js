const express = require('express');
const router = express.Router();

const dModule = require('../../modules/fiscal/fiscalController').FiscalController;
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validateInput } = require('../../modules/fiscal/fiscalValidation');

router.get('/', authorization, authentication, dModule.GetFiscal);
router.post('/', authorization, authentication, sanitize, validateInput, dModule.SaveFiscal);
router.get('/:id', authorization, authentication, dModule.GetFiscalById);
router.delete('/:id', authorization, authentication, dModule.DeleteById);

module.exports = router;
