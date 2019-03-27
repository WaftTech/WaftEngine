const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/media/' });

const dModule = require('../../modules/media/mediaController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

// router.get('/:page', authorization, dModule.GetMedia);
router.get('/', authorization, dModule.GetMediaPagination);
router.post('/single/:type', authorization, upload.array('file', 1), dModule.SaveMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authorization, dModule.DeleteMedia);

module.exports = router;
