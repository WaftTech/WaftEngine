const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const adminDashboardController = require('./../../modules/adminDashboard/adminDashboardController')


router.get('/user/registration', authentication, authorization, adminDashboardController.getNoOfCustomerByRegistration)

module.exports = router;
