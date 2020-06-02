const express = require('express');
const router = express.Router();

const validations = require('../../modules/subscribe/subscribeValidation');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const subscribeModule = require('../../modules/subscribe/subscribeController');

router.get('/', authorization, authentication, subscribeModule.GetSubscribe);
router.get('/:id', authorization, authentication, subscribeModule.GetSubscribeById);
router.post('/', validations.sanitize, validations.validate, subscribeModule.SaveSubscribe);
router.delete('/:id', authorization, authentication, subscribeModule.DeleteSubscribe);

module.exports = router;
