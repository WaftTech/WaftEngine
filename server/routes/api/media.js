const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/media/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/media/mediaController');
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, dModule.GetMediaPagination);
router.post('/single/:type', authentication, authorization, uploader.single('file'), dModule.SaveMedia);
router.post('/multiple/:type', authentication, authorization, uploader.any('file'), dModule.SaveMultipleMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authentication, authorization, dModule.DeleteMedia);
router.post('/uploader', authentication, authorization, uploader.any('file'), dModule.UploadFromCkEditor);
router.post('/deleteall', authentication, authorization, dModule.DeleteAllMedia);

module.exports = router;
