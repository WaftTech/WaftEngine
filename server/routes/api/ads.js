const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/ads/' });

const dModule = require('../../modules/Ads/adsController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetAds);
router.post('/', authenticationMiddleware.authorization, upload.array('file', 1), dModule.SaveAds);
router.get('/:slug', dModule.GetAdsDetail);

module.exports = router;
