const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/content/' });

const contentValidation = require('./../../modules/Content/ContentValidation');

const dModule = require('../../modules/content/contentController');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetContent);
router.post('/', authorization, upload.array('file', 1), contentValidation.sanitize, contentValidation.validation, dModule.SaveContent);
router.get('/:id', dModule.GetContentDetail);

module.exports = router;
