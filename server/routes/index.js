const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Roles
const roleRoutes = require('./api/roles');
router.use('/role', roleRoutes);
// All route of Content
const contentRoutes = require('./api/content');
router.use('/contents', contentRoutes);
// All route of Contact
const contactRoutes = require('./api/contact');
router.use('/contact', contactRoutes);
// All route of Media
const mediaRoutes = require('./api/media');
router.use('/media', mediaRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);
// All route of Static Data from DB Module
const staticRoutes = require('./api/static');
router.use('/static', staticRoutes);
//All route of Company
const companyRoutes = require('./api/company');
router.use('/company', companyRoutes);

// For offer
const offerRoutes = require('./api/offer');
router.use('/offer', offerRoutes);
// For Blog
const blogRoutes = require('./api/blog');
router.use('/blog', blogRoutes);
// For Errors
const bugsRoutes = require('./api/bugs');
router.use('/bugs', bugsRoutes);
// For Subscribe
const subscribeRoutes = require('./api/subscribe');
router.use('/subscribe', subscribeRoutes);

// For Blog
const sitemapRoutes = require('./api/sitemap');
router.use('/sitemap', sitemapRoutes);

module.exports = router;
