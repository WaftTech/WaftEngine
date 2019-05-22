const express = require('express');
const router = express.Router();

const validations = require('../../modules/faq/faqValidation');
const faqModule = require('../../modules/faq/faqController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, faqModule.GetFaq);
router.get('/all', faqModule.GetFaqAndCat);
router.get('/cat', faqModule.GetFaqCat);
router.get('/:id', faqModule.GetFaqById);
router.get('/cat/:id', authorization, faqModule.GetFaqCatById);
router.get('/bycat/:id', faqModule.GetFaqByCat);
router.post('/', authorization, authentication, validations.Sanitize, validations.Validation, faqModule.PostFaq);
router.post('/cat', authorization, authentication, validations.Sanitize, validations.Validation, faqModule.PostFaqCat);
router.delete('/:id', authorization, authentication, faqModule.DeleteFaq);
module.exports = router;
