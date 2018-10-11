const express = require('express');
const router = express.Router();
const dModule = require('../../modules/Home/HomeController');

router.get('/category', dModule.GetCategories);
router.get('/cat/:catid', dModule.GetOrganizationByCategoryById);
router.get('/org/:orgslug', dModule.GetOrganizationDetailByslug);
router.get('/fourorg', dModule.GetLatestFourOrganization);
router.get('/search/:catid/:text', dModule.GetDataforSearch);

module.exports = router;
