const express = require('express');
const router = express.Router();

const departmentValidation = require('./../../modules/companydepartment/departmentValidation');
const departmentModule = require('./../../modules/companydepartment/departmentController');

const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, departmentModule.getData);
router.post('/', authorization, authentication, departmentValidation.sanitize, departmentValidation.validate, departmentModule.saveData);
router.get('/:id', authorization, authentication, departmentModule.getDataByID);
router.delete('/:id', authorization, authentication, departmentModule.deleteById);

module.exports = router;
