const express = require('express');
const router = express.Router();
const dModule = require('../../modules/staticData/staticController');

router.get('/district/:StateID', dModule.GetDisctrict);
router.get('/state', dModule.GetStates);
router.get('/vdc/:DistrictID', dModule.GetVdcMunicipality);

module.exports = router;
