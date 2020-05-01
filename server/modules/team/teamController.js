const httpStatus = require('http-status');
const teamSch = require('./teamSchema');
const otherHelper = require('../../helper/others.helper');
const teamConfig = require('./teamConfig');
const teamController = {};

teamController.saveTeam = async (req, res, next) => {
  try {
    let team = req.body;
    if (team && team._id) {
      team.updated_at = new Date();
      team.updated_by = req.user.id;
      const update = await teamSch.findByIdAndUpdate(
        team._id,
        {
          $set: team,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, teamConfig.save, null);
    } else {
      const team_email = await teamSch.findOne({ email: req.body.email });
      if (team_email) {
        const errors = { email: 'email already exists' };
        const data = { email: req.body.email };
        return otherHelper.sendResponse(res, httpStatus.CONFLICT, false, data, errors, errors.email, null);
      } else {
        team.added_by = req.user.id;
        const new_team = new teamSch(team);
        const new_team_save = await new_team.save();
        return otherHelper.sendResponse(res, httpStatus.OK, true, new_team_save, null, teamConfig.get, null);
      }
    }
  } catch (err) {
    next(err);
  }
};
teamController.getTeam = async (req, res, next) => {
  try {
    const get_team = await teamSch.find({ is_deleted: false });
    return otherHelper.sendResponse(res, httpStatus.OK, true, get_team, null, teamConfig.save, null);
  } catch (err) {
    next(err);
  }
};

teamController.deleteTeam = async (req, res, next) => {
  try {
    const id = req.params.id;
    const delete_team = await teamSch.findByIdAndUpdate(
      id,
      {
        $set: { is_deleted: true, deleted_at: Date.now(), deleted_by: req.user.id },
      },
      { new: true },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, delete_team, null, teamConfig.delete, null);
  } catch (err) {
    next(err);
  }
};

teamController.getTeamDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const team_detail = await teamSch.findById(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, team_detail, null, teamConfig.get, null);
  } catch (err) {
    next(err);
  }
};
module.exports = teamController;
