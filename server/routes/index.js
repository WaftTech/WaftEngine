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
// All route of Media
const filesRoutes = require('./api/files');
router.use('/files', filesRoutes);
// All route of setting
const settingRoutes = require('./api/setting');
router.use('/setting', settingRoutes);
// All route of bugs
const bugRoutes = require('./api/bugs');
router.use('/bug', bugRoutes);
// All route of blogs
const blogRoutes = require('./api/blog');
router.use('/blog', blogRoutes);
// All route of sliders
const sliderRoutes = require('./api/slider');
router.use('/slider', sliderRoutes);
// All route of faqs
const faqRoutes = require('./api/faq');
router.use('/faq', faqRoutes);
// All route of Dynamic Module
const dmodule = require('./api/module');
router.use('/module', dmodule);
// All route of Subscribe
const subscribeRoutes = require('./api/subscribe');
router.use('/subscribe', subscribeRoutes);
// All route of templates (email)
const template = require('./api/template');
router.use('/template', template);
// All route of meta module (meta data)
const meta = require('./api/meta');
router.use('/meta', meta);
// All route of menu module
const menuRoutes = require('./api/menu');
router.use('/menu', menuRoutes);
// All route of Team module
const teamRoutes = require('./api/team');
router.use('/team', teamRoutes);
// All route of comment module (comments)
const comment = require('./api/comment');
router.use('/comment', comment);

module.exports = router;
