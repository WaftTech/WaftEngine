const express = require('express');
const router = express.Router();
const dModule = require('../../modules/Home/HomeController');

router.get('/category', dModule.GetCategories);
router.get('/search/:catid/:text', dModule.GetDataforSearch);

module.exports = router;
