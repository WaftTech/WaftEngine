const express = require('express');
const router = express.Router();

const contentValidation = require('./../../modules/content/contentValidation');
const dModule = require('../../modules/content/contentController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, dModule.GetContent);
router.post('/', authorization, authentication, contentValidation.sanitize, contentValidation.validation, dModule.SaveContent);
router.get('/:id', authorization, authentication, dModule.GetContentDetail);
router.get('/key/:key', dModule.GetContentByKey);
router.delete('/:id', authorization, authentication, dModule.DeleteContent);

module.exports = router;
