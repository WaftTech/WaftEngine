const express = require('express');
const router = express.Router();

const LeaveApplicationModule = require('../../modules/LeaveApplication/LeaveApplicationController');

const { authorization, authentication } = require('../../middleware/authentication.middleware');

const LeaveApplicationValidation = require('./../../modules/LeaveApplication/LeaveApplicationValidation');

router.get('/', authorization, authentication, LeaveApplicationModule.GetLeaveApplication);
router.get('/:id', authorization, authentication, LeaveApplicationModule.GetLeaveApplicationByID);
const application = [authorization, authentication, LeaveApplicationValidation.validate, LeaveApplicationValidation.validateRemarks, LeaveApplicationModule.AddLeaveApplication];

router.post('/', application);
router.delete('/:id', authorization, authentication, LeaveApplicationModule.DeleteByID);

//get number of days for requested leave
router.post('/noofdays', authorization, authentication, LeaveApplicationValidation.validateNoOfDays, LeaveApplicationModule.getNoOfDaysFromDates);

module.exports = router;
