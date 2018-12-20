const express = require('express');
const router = express.Router();

const LeaveApplicationModule = require('../../modules/LeaveApplication/LeaveApplicationController');

const LeaveApplicationValidation = require('./../../modules/LeaveApplication/LeaveApplicationValidation');

router.get('/', LeaveApplicationModule.GetLeaveApplication);
router.get('/:id', LeaveApplicationModule.GetLeaveApplicationByID);
router.post('/', LeaveApplicationValidation.validate, LeaveApplicationModule.AddLeaveApplication);
router.delete('/:id', LeaveApplicationModule.DeleteByID);

module.exports = router;
