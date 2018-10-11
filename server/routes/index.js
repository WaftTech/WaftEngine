const express = require('express');
const router = express.Router();

// All route of User
const userRoutes = require('./api/users');
router.use('/user', userRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);
// All route of Organization Module
const organizationRoutes = require('./api/organization');
router.use('/org', organizationRoutes);
// All route of Category Module
const categoryRoutes = require('./api/category');
router.use('/category', categoryRoutes);
// All route of Ads Module
const adsRoutes = require('./api/ads');
router.use('/ads', adsRoutes);
// All route of Articles Module
const articlesRoutes = require('./api/articles');
router.use('/articles', articlesRoutes);
// All route of News Module
const newsRoutes = require('./api/news');
router.use('/news', newsRoutes);
// All route of News Module
const linkRoutes = require('./api/links');
router.use('/link', linkRoutes);
// All route of Static Data from DB Module
const staticRoutes = require('./api/static');
router.use('/static', staticRoutes);

// Edit update
// router.post('/delete/:id', user.delete);

module.exports = router;
