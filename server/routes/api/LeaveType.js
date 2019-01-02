const express = require('express');
const router = express.Router();
const { authorization } = require('../../middleware/authentication.middleware');
const LeaveTypeModule = require('../../modules/LeaveType/LeaveTypeController').LeaveTypeController;

const LeaveTypeValidation = require('./../../modules/LeaveType/LeaveTypeValidation');

router.get('/', LeaveTypeModule.GetLeaveType);
router.get('/:id', LeaveTypeModule.GetLeaveTypeByID);
router.post('/', authorization, LeaveTypeValidation.validate, LeaveTypeModule.AddLeaveType);
router.delete('/:id', authorization, LeaveTypeModule.DeleteByID);

module.exports = router;
