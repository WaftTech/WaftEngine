const express = require('express');
const router = express.Router();

const teamController = require('../../modules/team/teamController');
const { sanitize, validate } = require('../../modules/team/teamValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.post('/', validate, authorization, teamController.saveTeam);
router.get('/', teamController.getTeam);
router.delete('/delete_team', authorization, teamController.deleteTeam);

<<<<<<< HEAD
module.exports = router;
=======

router.post('/' ,validate, authorization, teamController.saveTeam);

router.get('/' , teamController.getTeam);

router.get('/:id' , teamController.getTeamDetail);

router.delete('/:id' , authorization, teamController.deleteTeam);

module.exports=router;
>>>>>>> 01e732e032e223958e93321b5837aa002fdf9bec
