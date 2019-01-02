const express = require('express');
const router = express.Router();

const LeaveApplicationModule = require('../../modules/LeaveApplication/LeaveApplicationController');

const { authorization } = require('../../middleware/authentication.middleware');

const LeaveApplicationValidation = require('./../../modules/LeaveApplication/LeaveApplicationValidation');

router.get('/', LeaveApplicationModule.GetLeaveApplication);
router.get('/:id', LeaveApplicationModule.GetLeaveApplicationByID);
const application = [authorization, LeaveApplicationValidation.validate, LeaveApplicationModule.AddLeaveApplication];

router.post('/', application);
router.delete('/:id', authorization, LeaveApplicationModule.DeleteByID);

//get number of days for requested leave
router.post('/noofdays', authorization, LeaveApplicationModule.getNoOfDaysFromDates);

module.exports = router;
