const express = require('express');
const router = express.Router();
const dModule = require('../../modules/Sitemap/sitemapController');

router.get('/', dModule.GetSiteMap);

module.exports = router;
