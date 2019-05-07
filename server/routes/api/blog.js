const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/blog/');
const uploader = fileUpload.uploader;

// const upload = multer({
//   dest: 'public/blog/',
// });

const blogModule = require('../../modules/blog/blogController');
const { authorization } = require('../../middleware/authentication.middleware');
const { catSanitize, catValidate, sanitize, validate } = require('../../modules/blog/blogValidation');

router.get('/auth', authorization, blogModule.GetBlogAuthorize);
router.get('/', blogModule.GetBlogUnauthorize);
router.get('/category', blogModule.GetBlogCategory);
router.get('/category/:id', blogModule.GetBlogCatById);
router.get('/:id', blogModule.GetBlogDetail);
router.get('/blog/:slug', blogModule.GetBlogBySlug);
router.get('/blogbycat/:id', blogModule.GetBlogByCat);
router.get('/blogbytag/:tag', blogModule.GetBlogByTag);
router.get('/blogbytime/:time', blogModule.GetBlogByDate);
router.post('/', authorization,  uploader.single('file'), sanitize, validate, blogModule.SaveBlog);
router.post('/category', authorization, catSanitize, catValidate, blogModule.SaveBlogCategory);
router.delete('/:id', authorization, blogModule.DeleteBlog);

module.exports = router;
