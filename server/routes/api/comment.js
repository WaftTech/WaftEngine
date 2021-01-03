const express = require('express');
const router = express.Router();

const commentModule = require('../../modules/comment/commentController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitizeComment, validateComment } = require('../../modules/comment/commentValidation');

router.get('/:blog', commentModule.GetCommentByBlog);
router.get('/', commentModule.GetComment);
router.get('/one/:id', commentModule.GetCommentById);
router.post('/', authentication, sanitizeComment, validateComment, commentModule.PostComment);
router.post('/approve', authentication, authorization, commentModule.ApproveComment);
router.post('/disapprove', authentication, authorization, commentModule.DisApproveComment);
router.delete('/:id', authentication, authorization, commentModule.DeleteComment);

module.exports = router;
