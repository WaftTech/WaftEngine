const express = require('express');
const router = express.Router();

const teamController = require('../../modules/team/teamController');
const { validate } = require('../../modules/team/teamValidation');
const { authorization } = require('../../middleware/authentication.middleware');

router.post('/', validate, authorization, teamController.saveTeam);
router.get('/', teamController.getTeam);
router.delete('/delete_team', authorization, teamController.deleteTeam);

module.exports = router;
