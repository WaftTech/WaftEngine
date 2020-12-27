const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/files/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/files/filesController');
const { authentication } = require('../../middleware/authentication.middleware');

router.get('/folder/:id', authentication, dModule.GetFileAndFolder);
router.post('/folder/:id', authentication, dModule.AddFolders);
router.post('/file/:folder_id', authentication, uploader.any('file'), dModule.UploadFiles);
router.post('/rename/file', authentication, dModule.RenameFolder);
router.post('/file/type/:type', authentication, uploader.any('file'), dModule.UploadFilesToRoot);
router.delete('/folder/:id', authentication, dModule.DeleteFolder);
router.delete('/file/:id', authentication, dModule.DeleteFile);

module.exports = router;
