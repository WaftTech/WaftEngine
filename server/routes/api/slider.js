const express = require('express');
const router = express.Router();

const { authentication, authorization } = require('../../middleware/authentication.middleware');
const sliderModule = require('../../modules/slider/sliderController');
const validations = require('../../modules/slider/sliderValidations');

router.get('/', authorization, authentication, sliderModule.GetSlider);
router.get('/key/:key', sliderModule.GetSliderByKey);
router.get('/:id', authorization, sliderModule.GetSliderById);
router.post('/', authorization, authentication, validations.sanitize, validations.validate, sliderModule.SaveSlider);
router.delete('/:id', authorization, authentication, sliderModule.DeleteSlider);

module.exports = router;
