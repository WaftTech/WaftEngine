const express = require('express');
const router = express.Router();
const subscribes = require('../../modules/Subscribe/subscribeController');
const validation = require('../../modules/Subscribe/subscribeValidation');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
router.get('/', subscribes.GetSubscribes);
router.get('/:id', subscribes.GetSubscribeById);
router.post('/', authorization, validation.sanitize, validation.validate, subscribes.SaveSubscribe);
module.exports = router;
