const express = require('express');
const router = express.Router();
const htmlManupulator = require('./htmlmanupulator');

router.get('/company', htmlManupulator.sendForCompany);
router.get('/company/:id', htmlManupulator.sendForCompanyDetail);
router.get('/offer/:slug', htmlManupulator.sendForOfferDetail);
router.get('/about-us', htmlManupulator.sendForAboutUS);

module.exports = router;
