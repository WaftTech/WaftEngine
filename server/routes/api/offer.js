const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/offer/' });

const offerModule = require('../../modules/offer/offerController');
const { sanitize, validate } = require('../../modules/offer/offerValidate');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { GetCache } = require('../../middleware/caching.middleware');

router.get('/', GetCache, offerModule.GetOffer);
router.get('/:id', GetCache, offerModule.GetCompanyOffer);
router.get('/slug/:slug', offerModule.GetOfferDetailBySlug);
router.post('/', authorization, upload.single('file'), sanitize, validate, offerModule.SaveOffer);
router.delete('/:id', authorization, offerModule.DeleteOffer);

module.exports = router;
