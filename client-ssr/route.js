const express = require('express');
const router = express.Router();
const htmlManupulator = require('./htmlmanupulator');

router.get(['/login-user', '/signup-user', '/forgot-password-user', '/subscribe', '/contact-us', '/blog'], htmlManupulator.StaticPages);
router.get('/faq', htmlManupulator.FaqPage);
router.get(['/about-us', '/term-and-condition', '/data-policy', '/cookies-policy'], htmlManupulator.DynamicPages);
router.get('/blog/:slug_url', htmlManupulator.BlogBySlugUrl);
router.get('/blog/category/:slug_url', htmlManupulator.BlogsByCategoryPages);
router.get('/blog/tag/:tag', htmlManupulator.BlogsByTagPages);
router.get('/blog/author/:author', htmlManupulator.BlogsByAuthorPages);
router.get('/blog/date/:date', htmlManupulator.BlogByDatePages);

module.exports = router;
