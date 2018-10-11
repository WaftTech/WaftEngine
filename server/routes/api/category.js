const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/cat/' });

const dModule = require('../../modules/Category/categoryController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetCategory);
router.post('/', authenticationMiddleware.authorization, upload.array('file', 1), dModule.SaveCategory);
router.get('/:slug', dModule.GetCategoryDetail);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
