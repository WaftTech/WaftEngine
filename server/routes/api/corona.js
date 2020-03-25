const express = require('express');
const router = express.Router();

// const coronaValidation = require('./../../modules/corona/coronaValidation');
const dModule = require('../../modules/corona/coronaController');
router.post('/device', dModule.saveDevice);
router.get('/device', dModule.GetDevice);
router.get('/case', dModule.GetCorona);
router.post('/case', dModule.SaveCorona);

module.exports = router;
