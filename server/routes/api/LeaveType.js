/*const express = require('express');
const router = express.Router();

const LeaveTypeModule = require('../../modules/LeaveTypeController');

const LeaveTypeValidation = require('./../../modules/LeaveType/LeaveTypeValidation');

router.get('/', LeaveTypeModule.GetLeaveType);
router.get('/:id', LeaveType.GetLeaveTypebyID);
router.post('/', LeaveTypeValidation.LeaveType, LeaveTypeModule.AddLeaveType);
router.delete('/:id', LeaveTypeModule.DeleteByID);

module.exports = router;
