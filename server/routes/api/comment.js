const express = require('express');
const router = express.Router();

const commentModule = require('../../modules/comment/commentController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitizeComment, validateComment } = require('../../modules/comment/commentValidation');

router.get('/comment/:blog', commentModule.GetBlogCommentByBlog);
router.get('/comment', commentModule.GetBlogComment);
router.get('/comment/one/:id', commentModule.GetBlogCommentById);
router.post('/comment', authorization, sanitizeComment, validateComment, commentModule.PostBlogComment);
router.delete('/comment/:id', authorization, commentModule.DeleteBlogComment);

module.exports = router;
