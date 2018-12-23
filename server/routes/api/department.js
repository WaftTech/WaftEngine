const express = require('express');
const router = express.Router();

const departmentValidation = require('./../../modules/companydepartment/departmentValidation');
const departmentModule = require('./../../modules/companydepartment/departmentController');

const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, departmentModule.getData);
router.post('/', authorization, departmentValidation.sanitize, departmentValidation.validate, departmentModule.saveData);
router.get('/:id', authorization, departmentModule.getDataByID);
router.delete('/:id', authorization, departmentModule.deleteById);

module.exports = router;
