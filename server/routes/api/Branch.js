const express = require('express');
const router = express.Router();

const BranchModule = require('../../modules/Branch/BranchController');

const BranchValidation = require('./../../modules/Branch/BranchValidation');

const { authorization } = require('../../middleware/authentication.middleware');

router.get('/', authorization, BranchModule.GetBranch);

router.get('/:id', authorization, BranchModule.GetBranchDetail);

router.post('/', authorization, BranchValidation.validate, BranchModule.AddBranch);

router.delete('/:id', authorization, BranchModule.DeleteByID);

module.exports = router;
