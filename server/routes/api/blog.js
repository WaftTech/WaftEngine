const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/blog/');
const uploader = fileUpload.uploader;

const blogModule = require('../../modules/blog/blogController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { catSanitize, catValidate, sanitize, validate } = require('../../modules/blog/blogValidation');

router.get('/auth', authorization, authentication, blogModule.GetBlogAuthorize);
router.get('/', authorization, blogModule.GetBlogUnauthorize);
router.get('/latest', authorization, blogModule.getLatestBlog);
router.get('/related/:slug_url', authorization, blogModule.getRealtedBlog);
router.get('/category', authorization, blogModule.GetBlogCategory);
router.get('/category/:slug', authorization, blogModule.GetBlogCatBySlug);
router.get('/:id', authorization, blogModule.GetBlogDetail);
router.get('/blog/:slug_url', authorization, blogModule.GetBlogBySlug);
router.get('/blogbycat/:id', authorization, blogModule.GetBlogByCat);
router.get('/blogbytag/:tag', authorization, blogModule.GetBlogByTag);
router.get('/blogbytime/:time', authorization, blogModule.GetBlogByDate);
router.post('/', authorization, authentication, uploader.single('file'), sanitize, validate, blogModule.SaveBlog);
router.post('/category', authorization, authentication, uploader.single('file'), catSanitize, catValidate, blogModule.SaveBlogCategory);
router.delete('/:id', authorization, authentication, blogModule.DeleteBlog);
router.delete('/category/:id', authorization, authentication, blogModule.DeleteBlogCat);

module.exports = router;
