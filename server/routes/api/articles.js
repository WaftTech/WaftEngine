const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/article/' });

const dModule = require('../../modules/Articles/articlesController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetArticle);
router.post('/', authenticationMiddleware.authorization, upload.array('file', 1), dModule.SaveArticle);
router.get('/:slug', dModule.GetArticleDetail);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
