const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/ads/' });

const dModule = require('../../modules/Ads/adsController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetAds);
router.post('/', upload.array('file', 1), dModule.SaveAds);
router.get('/:slug', dModule.GetAdsDetail);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
