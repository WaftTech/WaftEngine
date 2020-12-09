const express = require('express');
const router = express.Router();

const faqvalidations = require('../../modules/faq/faqValidation');
const faqcatvalidations = require('../../modules/faq/faqValidation');
const faqModule = require('../../modules/faq/faqController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, faqModule.GetFaq);
router.get('/all', faqModule.GetFaqAndCat);
router.get('/cat', faqModule.GetFaqCat);
router.get('/:id', faqModule.GetFaqById);
router.get('/cat/:id', authorization, faqModule.GetFaqCatById);
router.get('/bycat/:id', faqModule.GetFaqByCat);
router.get('/key/:key', faqModule.GetCatByKey)
router.post('/', authorization, authentication, faqvalidations.Sanitize, faqvalidations.Validation, faqModule.PostFaq);
router.post('/cat', authorization, authentication, faqcatvalidations.catSanitize, faqcatvalidations.catValidation, faqModule.PostFaqCat);
router.delete('/cat/:id', authorization, authentication, faqModule.DeleteFaqCat);
router.delete('/:id', authorization, authentication, faqModule.DeleteFaq);

module.exports = router;
