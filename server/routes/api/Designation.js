const express = require('express');
const router = express.Router();

const DesignationModule = require('../../modules/Designation/DesignationController');

const DesignationValidation = require('./../../modules/Designation/DesignationValidation');

router.get('/', DesignationModule.GetDesignation);

router.get('/:id', DesignationModule.GetDesignationDetail);

router.post('/', DesignationValidation.Designation, DesignationModule.AddDesignation);

router.delete('/:id', DesignationModule.deletebyID);

module.exports = router;
