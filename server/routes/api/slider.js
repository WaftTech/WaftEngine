const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'public/slider',
});

const { authentication, authorization } = require('../../middleware/authentication.middleware');
const sliderModule = require('../../modules/slider/sliderController');
const validations = require('../../modules/slider/sliderValidations');

router.get('/', authorization, sliderModule.GetSlider);
router.get('/:id', authorization, sliderModule.GetSliderById);
router.post('/', authorization, upload.array('file', 1), validations.sanitize, validations.validate, sliderModule.SaveSlider);
router.delete('/:id', authorization, sliderModule.DeleteSlider);

module.exports = router;
