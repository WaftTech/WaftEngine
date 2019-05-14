const express = require('express');
const router = express.Router();
const htmlManupulator = require('./htmlmanupulator');

router.get('/blog', htmlManupulator.sendWithRoute);
// router.get('/company/:id', htmlManupulator.sendForCompanyDetail);
// router.get('/offer/:slug', htmlManupulator.sendForOfferDetail);
// router.get('/blog/:slug', htmlManupulator.sendForBlogDetail);
// router.get('/about-us', htmlManupulator.sendForAboutUS);

module.exports = router;
