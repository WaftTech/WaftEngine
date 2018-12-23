const express = require('express');
const router = express.Router();

const BranchModule = require('../../modules/Branch/BranchController');

const BranchValidation = require('./../../modules/Branch/BranchValidation');

router.get('/', BranchModule.GetBranch);

router.get('/:id', BranchModule.GetBranchDetail);

router.post('/', BranchValidation.Branch, BranchModule.AddBranch);

router.delete('/:id', BranchModule.DeletebyID);

module.exports = router;
