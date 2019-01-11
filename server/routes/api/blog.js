const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/blog/' });

const dmodule = require('../../modules/blog/blogController');
const { authorization } = require('../../middleware/authentication.middleware');
const validateInput = require('../../modules/blog/blogValidation');

router.get('/', dmodule.GetBlogUnauthorize);
router.get('/auth', dmodule.GetBlogAuthorize);
router.post('/', upload.array('BlogImage', 1), validateInput, dmodule.SaveBlog);
router.get('/:id', dmodule.GetBlogDetail);
module.exports = router;
