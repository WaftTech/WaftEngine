const express = require('express');
const router = express.Router();

const contModule = require('../../modules/contactUs/contactController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');
const { sanitize, validate } = require('../../modules/contactUs/contactValidation');

router.get('/', authorization, authentication, contModule.GetContact);
router.get('/:id', authorization, authentication, contModule.GetContactById);
router.post('/', sanitize, validate, contModule.PostContact);
router.delete('/:id', authorization, authentication, contModule.DeleteContact);

module.exports = router;
