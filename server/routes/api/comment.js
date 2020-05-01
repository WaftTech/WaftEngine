const express = require('express');
const router = express.Router();

const commentModule = require('../../modules/comment/commentController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitizeComment, validateComment } = require('../../modules/comment/commentValidation');

router.get('/:blog', commentModule.GetCommentByBlog);
router.get('/', commentModule.GetComment);
router.get('/one/:id', commentModule.GetCommentById);
router.post('/', authorization, sanitizeComment, validateComment, commentModule.PostComment);
router.post('/approve', authorization, authentication, commentModule.ApproveComment);
router.post('/disapprove', authorization, authentication, commentModule.DisApproveComment);
router.delete('/:id', authorization, authentication, commentModule.DeleteComment);

module.exports = router;
