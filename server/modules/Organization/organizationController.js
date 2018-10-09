const HttpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const OrgSch = require('./organization');
const orgController = {};
const internal = {};

orgController.GetOrganization = async (req, res, next) => {
  const orgs = await OrgSch.find();
  return otherHelper.sendResponse(res, HttpStatus.OK, true, orgs, null, 'Organization Get Success !!', null);
};
orgController.SaveOrganization = async (req, res, next) => {
  try {
    const org = req.body;
    if (org._id) {
      if (req.files && req.files[0]) {
        org.ProfileImage = req.files[0];
      }
      if (req.files && req.files[1]) {
        org.ProfileImage1 = req.files[1];
      }
      const update = await OrgSch.findByIdAndUpdate(org._id, { $set: org });
      return otherHelper.sendResponse(res, HttpStatus.OK, true, update, null, 'Organization Saved Success !!', null);
    } else {
      org.ProfileImage = req.files[0];
      org.ProfileImage1 = req.files[1];
      const newOrg = new OrgSch(org);
      newOrg.Added_by = req.user.id;
      const orgSave = await newOrg.save();
      return otherHelper.sendResponse(res, HttpStatus.OK, true, orgSave, null, 'Organization Saved Success !!', null);
    }
  } catch (err) {
    next(err);
  }
};
orgController.GetOrganizationDetail = async (req, res, next) => {
  const slug = req.params.slug;
  const org = await OrgSch.findOne({ slug: slug });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, org, null, 'Organization Get Success !!', null);
};

module.exports = orgController;
