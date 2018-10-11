const HttpStatus = require('http-status');
var ObjectId = require('mongoose').Types.ObjectId;
const otherHelper = require('../../helper/others.helper');
const OrgSch = require('../Organization/organization');
const CatSch = require('../Category/category');
const homeController = {};
const internal = {};

homeController.GetCategories = async (req, res, next) => {
  try {
    console.log(1);
    const categotys = await CatSch.find({ IsDeleted: false, IsActive: true });
    return otherHelper.sendResponse(res, HttpStatus.OK, true, categotys, null, 'Category Get Success !!', null);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

homeController.GetOrganizationByCategoryById = async (req, res, next) => {
  const catid = req.params.catid;
  const category = await CatSch.findById(ObjectId(catid));
  const organization = await OrgSch.find({ Category: catid, IsDeleted: false, IsActive: true, IsVerified: true });
  return otherHelper.sendResponse(res, HttpStatus.OK, true, { organization, category }, null, 'Organization for Category Get Success !!', null);
};
homeController.GetOrganizationDetailByslug = async (req, res, next) => {
  const slug = req.params.orgslug;
  const organization = await OrgSch.findOne({ slug: slug });
  const category = await CatSch.findById(ObjectId(organization.Category));
  return otherHelper.sendResponse(res, HttpStatus.OK, true, { organization, category }, null, 'Organization Detail Get Success !!', null);
};
homeController.GetLatestFourOrganization = async (req, res, next) => {
  const organization = await OrgSch.find({ IsDeleted: false, IsActive: true, IsVerified: true })
    .sort({ Added_at: -1 })
    .limit(4);
  return otherHelper.sendResponse(res, HttpStatus.OK, true, organization, null, 'Latst Organization for home Page Get Success !!', null);
};
homeController.GetDataforSearch = async (req, res, next) => {
  const catid = req.params.catid;
  const text = req.params.text;
  const organization = await OrgSch.find({ IsDeleted: false, IsActive: true, IsVerified: true }, 'Organization slug').sort({ Added_at: -1 });
  var options = {
    pre: '<b>',
    post: '<b>',
    extract: function(el) {
      return el.Organization;
    },
  };
  var results = fuzzy.filter(text, list, options);
  return otherHelper.sendResponse(res, HttpStatus.OK, true, organization, null, 'Latst Organization for home Page Get Success !!', null);
};

module.exports = homeController;
