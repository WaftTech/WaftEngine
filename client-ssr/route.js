const express = require('express');
const router = express.Router();
const htmlManupulator = require('./htmlmanupulator');

router.get('/products', htmlManupulator.products);
router.get('/services', htmlManupulator.services);
router.get('/approach', htmlManupulator.approach);
router.get('/blog', htmlManupulator.blogList);
router.get('/blog/:slug_url', htmlManupulator.blogBySlugUrl);
router.get('/team', htmlManupulator.team);
router.get('/contact', htmlManupulator.contactUs);
router.get('/blog-category', htmlManupulator.blogCategory);
router.get('/blog-category/:id', htmlManupulator.BlogCategoryByID);

module.exports = router;
