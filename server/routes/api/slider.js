const express = require('express');
const router = express.Router();
// const fileUpload = require('../../helper/upload.helper')('public/slider/');
// const uploader = fileUpload.uploader;
// // const multer = require('multer');
// // const upload = multer({
// //   dest: 'public/slider',
// // });

const { authentication, authorization } = require('../../middleware/authentication.middleware');
const sliderModule = require('../../modules/slider/sliderController');
const validations = require('../../modules/slider/sliderValidations');

router.get('/', authorization, sliderModule.GetSlider);
router.get('/key/:key', sliderModule.GetSliderByKey);
router.get('/:id', authorization, sliderModule.GetSliderById);
router.post('/', authorization,  validations.sanitize, validations.validate, sliderModule.SaveSlider);
router.delete('/:id', authorization, sliderModule.DeleteSlider);

module.exports = router;
