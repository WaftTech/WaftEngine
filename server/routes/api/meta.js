const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/meta/');
const uploader = fileUpload.uploader;

const metaModule = require('../../modules/meta/metaController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const validations = require('./../../modules/meta/metaValidation');

router.get('/', authentication, metaModule.getAllMeta);
router.get('/:id', authentication, metaModule.getDetail);
router.get('/route/*', metaModule.getByRoute);
router.post('/', authentication, authorization, uploader.single('file'), validations.Sanitized, validations.Validate, metaModule.saveMeta);
router.delete('/:id', authentication, authorization, metaModule.delete);

module.exports = router;
