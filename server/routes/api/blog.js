const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/blog/'
});

const blogModule = require('../../modules/blog/blogController');
const {
  authorization
} = require('../../middleware/authentication.middleware');
const {
  catSanitize,
  catValidate,
  sanitize,
  validate
} = require('../../modules/blog/blogValidation');

router.get('/auth', authorization, blogModule.GetBlogAuthorize);
router.get('/', blogModule.GetBlogUnauthorize);
router.get('/category', blogModule.GetBlogCategory);
router.get('/category/:slug', blogModule.GetBlogCatBySlug);
router.get('/:id', authorization, blogModule.GetBlogDetail);
router.get('/blog/:slug', authorization, blogModule.GetBlogBySlug);
router.get('/blogbycat/:id', authorization, blogModule.GetBlogByCat);
router.get('/blogbytag/:tag', authorization, blogModule.GetBlogByTag);
router.get('/blogbytime/:time', authorization, blogModule.GetBlogByDate);
router.post('/', authorization, upload.array('file', 1), sanitize, validate, blogModule.SaveBlog);
router.post('/category', authorization, catSanitize, catValidate, blogModule.SaveBlogCategory);
router.delete('/:id', authorization, blogModule.DeleteBlog);

module.exports = router;