const express = require('express');
const router = express.Router();

const DesignationModule = require('../../modules/Designation/DesignationController');

const { authorization, authentication } = require('../../middleware/authentication.middleware');
const DesignationValidation = require('./../../modules/Designation/DesignationValidation');

router.get('/', authorization, authentication, DesignationModule.GetDesignation);

router.get('/:id', authorization, authentication, DesignationModule.GetDesignationDetail);

router.post('/', authorization, authentication, DesignationValidation.Designation, DesignationModule.AddDesignation);

router.delete('/:id', authorization, authentication, DesignationModule.deletebyID);

module.exports = router;
