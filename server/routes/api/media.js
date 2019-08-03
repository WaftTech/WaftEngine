const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/media/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/media/mediaController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

// router.get('/:page', authorization, dModule.GetMedia);
router.get('/', authorization, authentication, dModule.GetMediaPagination);
router.post('/single/:type', authorization, authentication, uploader.single('file'), dModule.SaveMedia);
router.post('/multiple/:type', authorization, authentication, uploader.any('file'), dModule.SaveMultipleMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authorization, authentication, dModule.DeleteMedia);

module.exports = router;
