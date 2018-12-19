const express = require('express');
const router = express.Router();

const LeaveTypeModule = require('../../modules/LeaveType/LeaveTypeController');

const LeaveTypeValidation = require('./../../modules/LeaveType/LeaveTypeValidation');

router.get('/', LeaveTypeModule.GetLeaveType);
router.get('/:id', LeaveTypeModule.GetLeaveTypeByID);
router.post('/', LeaveTypeValidation.validate, LeaveTypeModule.AddLeaveType);
router.delete('/:id', LeaveTypeModule.DeleteByID);

module.exports = router;
