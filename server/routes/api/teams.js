const express = require('express');
const router = express.Router();

const team = require('../../modules/Teams/TeamController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router
  .get('/user', authenticationMiddleware.authorization, team.getTeamOfUser)
  .post('/user', authenticationMiddleware.authorization, team.postTeamOfUser);
router.get(
  '/user/:id',
  authenticationMiddleware.authorization,
  team.getTeamDetail,
);

module.exports = router;
