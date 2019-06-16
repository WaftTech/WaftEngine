const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/blog/');
const uploader = fileUpload.uploader;

const blogModule = require('../../modules/blog/blogController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { catSanitize, catValidate, sanitize, validate } = require('../../modules/blog/blogValidation');

router.get('/auth', authorization, authentication, blogModule.GetBlogAuthorize);
router.get('/', blogModule.GetBlogUnauthorize);
router.get('/category', blogModule.GetBlogCategory);
router.get('/category/:id', authorization, authentication, blogModule.GetBlogCatById);
router.get('/:id', authorization, authentication, blogModule.GetBlogDetail);
router.get('/blog/:slug_url', blogModule.GetBlogBySlug);
router.get('/blogbycat/:id', blogModule.GetBlogByCat);
router.get('/blogbytag/:tag', blogModule.GetBlogByTag);
router.get('/blogbytime/:time', blogModule.GetBlogByDate);
router.post('/', authorization, authentication, uploader.single('file'), sanitize, validate, blogModule.SaveBlog);
router.post('/category', authorization, authentication, catSanitize, catValidate, blogModule.SaveBlogCategory);
router.delete('/:id', authorization, authentication, blogModule.DeleteBlog);
router.delete('/category/:id', authorization, blogModule.DeleteBlogCat);

module.exports = router;
