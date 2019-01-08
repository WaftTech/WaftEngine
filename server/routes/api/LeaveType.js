const express = require('express');
const router = express.Router();
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const LeaveTypeModule = require('../../modules/LeaveType/LeaveTypeController').LeaveTypeController;

const LeaveTypeValidation = require('./../../modules/LeaveType/LeaveTypeValidation');

router.get('/', authorization, authentication, LeaveTypeModule.GetLeaveType);
router.get('/:id', authorization, authentication, LeaveTypeModule.GetLeaveTypeByID);
router.post('/', authorization, authentication, LeaveTypeValidation.validate, LeaveTypeModule.AddLeaveType);
router.delete('/:id', authorization, authentication, LeaveTypeModule.DeleteByID);

module.exports = router;
