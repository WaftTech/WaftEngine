const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Rashifal/rashifalController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', dModule.GetRashifal);
router.post('/', authenticationMiddleware.authorization, dModule.SaveRashifal);
router.get('/:id', dModule.GetRashifalDetail);

module.exports = router;
