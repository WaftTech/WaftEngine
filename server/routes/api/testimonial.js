const express = require('express');
const router = express.Router();

const testimonialController = require('../../modules/testimonial/testimonialController');
const { validate } = require('../../modules/testimonial/testimonialValidation');
const { authentication } = require('../../middleware/auth.middleware');

router.post('/', validate, authentication, testimonialController.saveTestimonial);
router.get('/', testimonialController.getTestimonial);
router.get('/:id', testimonialController.getTestimonialDetail);
router.delete('/delete_team', authentication, testimonialController.deleteTestimonial);
router.get('/settings/get', authentication, testimonialController.getTestimonialSetting);
router.post('/settings/save', authentication, testimonialController.saveTestimonialSetting);
router.post('/multiple', authentication, testimonialController.selectMultipleData);

module.exports = router;
