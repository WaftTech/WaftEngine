const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Designation/DesignationController');

const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

const HttpStatus = require('http-status');
const OtherHelper = require('../../helper/others.helper');

const DesignationValidation = require('./../../modules/Designation/DesignationValidation');

router.get('/', dModule.GetDesignation);

router.get('/:id', dModule.GetDesignationDetail);

router.post('/', DesignationValidation.Designation, dModule.AddDesignation);

router.delete('/:id', dModule.DeleteDesignation);

module.exports = router;
