const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/content/' });

const dModule = require('../../modules/Contents/contentController');
const validations = require('../../modules/Contents/contentValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetContent);
router.post('/', authorization, upload.array('file', 1), validations.sanitize, validations.validation, dModule.SaveContent);
router.get('/:id', dModule.GetContentDetail);
router.get('/key/:key', dModule.GetContentByKey);

module.exports = router;
