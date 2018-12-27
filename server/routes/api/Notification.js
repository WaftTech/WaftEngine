const express = require('express');
const router = express.Router();

const NotificationModule = require('../../modules/Notification/NotificationController');

const { authorization } = require('../../middleware/authentication.middleware');

const NotificationValidation = require('./../../modules/Notification/NotificationValidation');

router.get('/', NotificationModule.GetNotification);
router.get('/:id', NotificationModule.GetNotificationByID);
router.post('/', authorization, NotificationValidation.validate, NotificationModule.AddNotification);
//router.delete('/:id', authorization, NotificationModule.DeleteByID);

module.exports = router;
