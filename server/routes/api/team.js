const express = require('express');
const router = express.Router();

const teamController = require('../../modules/team/teamController');
const { validate } = require('../../modules/team/teamValidation');
const { authentication } = require('../../middleware/auth.middleware');

router.post('/', validate, authentication, teamController.saveTeam);
router.get('/', teamController.getTeam);
router.delete('/delete_team', authentication, teamController.deleteTeam);

module.exports = router;
