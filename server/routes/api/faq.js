const express = require('express');
const router = express.Router();

const faqValidations = require('../../modules/faq/faqValidation');
const faqCatValidations = require('../../modules/faq/faqCatValidation');
const faqModule = require('../../modules/faq/faqController');
const { authorization, authentication } = require('../../middleware/auth.middleware');

router.get('/', authentication, authorization, faqModule.GetFaq);
router.get('/all', faqModule.GetFaqAndCat);
router.get('/cat', faqModule.GetFaqCat);
router.get('/:id', faqModule.GetFaqById);
router.get('/cat/:id', authentication, faqModule.GetFaqCatById);
router.get('/bycat/:id', faqModule.GetFaqByCat);
router.get('/key/:key', faqModule.GetCatByKey)
router.post('/', authentication, authorization, faqValidations.Sanitize, faqValidations.Validation, faqModule.PostFaq);
router.post('/cat', authentication, authorization, faqCatValidations.Sanitize, faqCatValidations.Validation, faqModule.PostFaqCat);
router.delete('/cat/:id', authentication, authorization, faqModule.DeleteFaqCat);
router.delete('/:id', authentication, authorization, faqModule.DeleteFaq);

module.exports = router;
