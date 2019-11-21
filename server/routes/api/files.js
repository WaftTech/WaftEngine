const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/files/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/files/filesController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/folder/:id', authorization, dModule.GetFileAndFolder);
router.post('/folder/:id', authorization, dModule.AddFolders);
router.post('/file/:folder_id', authorization, uploader.any('file'), dModule.UploadFiles);
router.delete('/folder/:id', authorization, dModule.DeleteFolder);
router.delete('/file/:id', authorization, dModule.DeleteFile);

module.exports = router;
