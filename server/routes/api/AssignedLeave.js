const express = require('express');
const router = express.Router();

const AssignedLeaveValidation = require('./../../modules/AssignedLeave/AssignedLeaveValidation');
const AssignedLeaveModule = require('./../../modules/AssignedLeave/AssignedLeaveController');

const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, AssignedLeaveModule.getData);
router.post('/', authorization, AssignedLeaveValidation.Sanitize, AssignedLeaveValidation.Validate, AssignedLeaveModule.saveData);
router.get('/:id', authorization, AssignedLeaveModule.getDataByID);
router.delete('/:id', authorization, AssignedLeaveModule.deleteById);

router.get('/getassignedleavelist/:empid', authorization, AssignedLeaveModule.getLeaveListOfEmployee);

module.exports = router;
