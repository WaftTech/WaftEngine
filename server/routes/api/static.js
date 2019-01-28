const express = require('express');
const router = express.Router();
const dModule = require('../../modules/staticData/staticController');

router.get('/district/:stateId', dModule.GetDisctrict);
router.get('/state', dModule.GetStates);
router.get('/vdc/:districtId', dModule.GetVdcMunicipality);

module.exports = router;
