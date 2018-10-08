const Team = require('./Team');
const User = require('../Users/User');
const HttpStatus = require('http-status');

const otherHelper = require('../../helper/others.helper');

const teamController = {};

teamController.getTeamOfUser = async (req, res, next) => {
  const data = await Team.find({ user_id: { $in: [req.user.id] } });
  return otherHelper.sendResponse(
    res,
    HttpStatus.OK,
    true,
    data,
    null,
    null,
    null,
  );
};
teamController.getTeamDetail = async (req, res, next) => {
  const data = await Team.findOne({
    user_id: { $in: [req.user.id] },
    _id: req.params.id,
  })
    .populate({ path: 'user_id', model: User })
    .exec();
  return otherHelper.sendResponse(
    res,
    HttpStatus.OK,
    true,
    data,
    null,
    null,
    null,
  );
};
teamController.postTeamOfUser = async (req, res, next) => {
  try {
    const {
      body: { name, description, _id, user_id },
    } = req;
    let response;
    if (_id) {
      let oldTeam = await Team.findById(_id);
      oldTeam.name = name;
      oldTeam.description = description;
      oldTeam.user_id = user_id;
      response = await oldTeam.save();
    } else {
      const newTeam = new Team({
        name: name,
        description: description,
        user_id: user_id,
        added_by: req.user.id,
        added_on: new Date(),
      });
      response = await newTeam.save();
    }
    return otherHelper.sendResponse(
      res,
      HttpStatus.OK,
      true,
      response,
      null,
      'Team Saved.',
      null,
    );
  } catch (err) {
    return next(err);
  }
};

module.exports = teamController;
