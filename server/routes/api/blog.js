const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/blog/' });

const blogModule = require('../../modules/blog/blogController');
const { authorization } = require('../../middleware/authentication.middleware');
const validations = require('../../modules/blog/blogValidation');

router.get('/', blogModule.GetBlogUnauthorize);
router.get('/category', blogModule.GetBlogCategory);
router.get('/category/:slug', blogModule.GetBlogCatBySlug);
router.get('/auth', blogModule.GetBlogAuthorize);
router.post('/', validations.sanitize, validations.validate, blogModule.SaveBlog);
router.post('/category', validations.catSanitize, validations.catValidate, blogModule.SaveBlogCategory);
router.get('/:id', blogModule.GetBlogDetail);
router.delete('/:id', blogModule.DeleteBlog);
module.exports = router;
