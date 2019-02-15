const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/videos',
});
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const vidModule = require('../../modules/video/videoController');
const validations = require('../../modules/video/videoValidation');

router.get('/', authorization, vidModule.GetVideo);
router.post('/', authorization, upload.array('file', 1), validations.sanitize, validations.validate, vidModule.PostVideo);
router.get('/:code', authorization, vidModule.GetVideoByCode);
router.delete('/:id', authorization, vidModule.DeleteVideo);

module.exports = router;
