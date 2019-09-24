const express = require('express');
const router = express.Router();

const commentModule = require('../../modules/comment/commentController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitizeComment, validateComment } = require('../../modules/comment/commentValidation');

router.get('/:blog', commentModule.GetBlogCommentByBlog);
router.get('/', commentModule.GetBlogComment);
router.get('/one/:id', commentModule.GetBlogCommentById);
router.post('/', authorization, sanitizeComment, validateComment, commentModule.PostBlogComment);
router.delete('/:id', authorization, commentModule.DeleteBlogComment);

module.exports = router;
