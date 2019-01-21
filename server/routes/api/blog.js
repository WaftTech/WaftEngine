const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/blog/',
});

const dmodule = require('../../modules/blog/blogController');
const { authorization } = require('../../middleware/authentication.middleware');
const {
  catSanitize,
  catValidate,
  sanitize,
  validateInput,
} = require('../../modules/blog/blogValidation');

router.get('/', authorization, dmodule.GetBlogAuthorize);
router.get('/blogs', dmodule.GetBlogUnauthorize);
router.get('/category', dmodule.GetBlogCategory);
router.get('/category/:slug', dmodule.GetBlogCatBySlug);
router.get('/:id', authorization, dmodule.GetBlogDetail);
router.get('/blog/:slug', authorization, dmodule.GetBlogBySlug);
router.get('/blogbycat/:id', authorization, dmodule.GetBlogByCat);
router.get('/blogbycatslug/:slug', authorization, dmodule.GetBlogByCatSlug);
router.get('/blogbytag/:tag', authorization, dmodule.GetBlogByTag);
router.get('/blogbytime/:time', authorization, dmodule.GetBlogByDate);
router.post('/', authorization, upload.array('file', 1), sanitize, validateInput, dmodule.SaveBlog);
router.post('/category', catSanitize, catValidate, dmodule.SaveBlogCategory);
router.delete('/:id', authorization, dmodule.DeleteBlog);
module.exports = router;
