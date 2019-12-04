const express = require('express');
const router = express.Router();
const teamController = require('../../modules/team/teamController');
const {sanitize,validate} = require('../../modules/team/teamValidation');
const { authorization } = require('../../middleware/authentication.middleware');



router.post('/' ,validate, authorization, teamController.saveTeam);

router.get('/' , teamController.getTeam);

router.get('/:id' , teamController.getTeamDetail);

router.delete('/:id' , authorization, teamController.deleteTeam);

module.exports=router;