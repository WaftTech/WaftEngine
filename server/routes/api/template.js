const express = require('express');
const router = express.Router();

const validations = require('../../modules/template/templateValidation');
const templateModule = require('../../modules/template/templateController').templateController;
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, templateModule.getTemplateName);
router.get('/:key', authorization, templateModule.getTemplateDetail);
router.post('/', authorization, validations.sanitze, validations.validate, templateModule.postTemplate);

module.exports = router;
