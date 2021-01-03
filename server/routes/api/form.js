const express = require('express');
const router = express.Router();
const formController = require('../../modules/form/formController');
const {sanitize,validation  } = require('../../modules/form/formValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.post('/' ,sanitize,validation,authorization, formController.postForm);

router.get('/' , formController.getForm);

router.delete('/:id' ,authorization, formController.deleteForm);

router.get('/:id' , formController.getFormDetail);

module.exports = router;