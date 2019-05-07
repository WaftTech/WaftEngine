const express = require('express');
const router = express.Router();


const validations = require('../../modules/faq/faqValidation');
const faqModule = require('../../modules/faq/faqController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, faqModule.GetFaq);
router.get('/all', faqModule.GetFaqAndCat);
router.get('/cat', authorization, faqModule.GetFaqCat);
router.get('/:id', authorization, faqModule.GetFaqById);
router.get('/cat/:slug', authorization, faqModule.GetFaqCatBySlug);
router.get('/bycat/:id', authorization, faqModule.GetFaqByCat);
router.post('/', authorization, validations.Sanitize, validations.Validation, faqModule.PostFaq);
router.post('/cat', authorization, validations.Sanitize, validations.Validation, faqModule.PostFaqCat);
router.delete('/:id', authorization, faqModule.DeleteFaq);
module.exports = router;
