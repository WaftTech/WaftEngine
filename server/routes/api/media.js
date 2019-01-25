const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/media/' });

const dModule = require('../../modules/media/mediaController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', authenticationMiddleware.authorization, dModule.GetMedia);
router.post('/single/:type', authenticationMiddleware.authorization, upload.array('file', 1), dModule.SaveMedia);
router.get('/:id', dModule.GetMediaDetail);
router.delete('/:id', authenticationMiddleware.authorization, dModule.DeleteMedia);

module.exports = router;
