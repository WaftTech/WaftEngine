const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/videos',
});
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const vidModule = require('../../modules/video/videoController');
const validations = require('../../modules/video/videoValidation');

router.get('/auth', authorization, authentication, vidModule.GetVideo);
router.get('/', vidModule.GetVideoForUser);
router.post('/', authorization, authentication, validations.sanitize, validations.validate, vidModule.PostVideo);
router.get('/auth/:id', authorization, authentication, vidModule.GetVideoById);
router.get('/:id', vidModule.GetVideoById);
router.get('/link/auth/:id', authorization, authentication, vidModule.GetVideoDetailById);
router.get('/link/:id', vidModule.GetVideoDetailByIdForUser);
router.delete('/:id', authorization, authentication, vidModule.DeleteVideo);

module.exports = router;
