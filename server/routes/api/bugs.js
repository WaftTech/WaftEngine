const express = require('express');
const router = express.Router();

const bugModule = require('../../modules/bug/bugController');
const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, bugModule.GetErrors);
module.exports = router;
