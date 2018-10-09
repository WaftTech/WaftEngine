const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Link/linkController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetLink);
router.post('/', dModule.SaveLink);
router.get('/:slug', dModule.GetLinkDetail);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
