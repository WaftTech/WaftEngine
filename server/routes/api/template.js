const express = require('express');
const router = express.Router();

const validations = require('../../modules/template/templateValidation');
const templateModule = require('../../modules/template/templateController').templateController;
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, templateModule.getTemplateName);
router.get('/:key', authorization, authentication, templateModule.getTemplateDetail);
router.post('/', authorization, authentication, validations.sanitze, validations.validate, templateModule.postTemplate);

module.exports = router;
