const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/meta/');
const uploader = fileUpload.uploader;

const metaModule = require('../../modules/meta/metaController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const validations = require('./../../modules/meta/metavalidation');

router.get('/', authorization, metaModule.getAllMeta);
router.get('/:id', authorization, metaModule.getDetail);
router.get('/route/:id', metaModule.getByRoute);
router.post('/', authorization, uploader.single('file'), validations.Santize, validations.Validate, metaModule.saveMeta);
router.delete('/:id', authorization, metaModule.delete);

module.exports = router;
