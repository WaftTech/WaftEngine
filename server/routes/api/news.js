const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/news/' });

const dModule = require('../../modules/News/newsController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetNews);
router.post('/', authenticationMiddleware.authorization, upload.array('file', 1), dModule.SaveNews);
router.get('/:slug', dModule.GetNewsDetail);

module.exports = router;
