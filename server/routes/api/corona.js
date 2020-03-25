const express = require('express');
const router = express.Router();

// const coronaValidation = require('./../../modules/corona/coronaValidation');
const dModule = require('../../modules/corona/coronaController');
router.post('/device', dModule.saveDevice);
router.get('/', dModule.GetCorona);

module.exports = router;
