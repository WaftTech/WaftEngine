const express = require('express');
const router = express.Router();

const contentValidation = require('./../../modules/content/contentValidation');

const dModule = require('../../modules/content/contentController');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, dModule.GetContent);
router.post('/', authorization, contentValidation.sanitize, contentValidation.validation, dModule.SaveContent);
router.get('/:id', authorization, dModule.GetContentDetail);

module.exports = router;
