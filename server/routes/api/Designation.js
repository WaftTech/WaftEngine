const express = require('express');
const router = express.Router();

const DesignationModule = require('../../modules/Designation/DesignationController');

const validator = require('validator');
const isEmpty = require('../../validation/isEmpty');

const HttpStatus = require('http-status');
const OtherHelper = require('../../helper/others.helper');

const DesignationValidation = require('./../../modules/Designation/DesignationValidation');

router.get('/', DesignationModule.GetDesignation);

router.get('/:id', DesignationModule.getDataByID);

router.post('/', DesignationValidation.Designation, DesignationModule.AddDesignation);

router.delete('/:id', DesignationModule.deletebyID);

module.exports = router;
