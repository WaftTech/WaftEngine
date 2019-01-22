const express = require('express');
const router = express.Router();

const contModule = require('../../modules/contactUs/contactController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/contactUs/contactValidate');

router.get('/', authorization, contModule.GetContact);
router.get('/:id', authorization, contModule.GetContactById);
router.post('/', sanitize, validate, contModule.PostContact);

module.exports = router;
