const express = require('express');
const router = express.Router();

const bugModule = require('../../modules/bug/bugController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, bugModule.GetErrors);
module.exports = router;
