const express = require('express');
const router = express.Router();

const BranchModule = require('../../modules/Branch/BranchController');

const BranchValidation = require('./../../modules/Branch/BranchValidation');

const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', authorization, authentication, BranchModule.GetBranch);

router.get('/:id', authorization, authentication, BranchModule.GetBranchDetail);

router.post('/', authorization, authentication, BranchValidation.validate, BranchModule.AddBranch);

router.delete('/:id', authorization, authentication, BranchModule.DeleteByID);

module.exports = router;
