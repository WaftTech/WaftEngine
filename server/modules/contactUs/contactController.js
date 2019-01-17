const httpStatus = require('http-status');
const objectId = require('mongoose').ObjectId;
const otherHelper = require('../../helper/others.helper');
const contactConfig = require('./contactConfig');
const contactSch = require('./contactSchema');
const emailTemplate = require('../../helper/email-render-template');
const contactController = {};

contactController.PostContact = async (req, res, next) => {
  try {
    let { name, email, message, subject } = req.body;
    const newUser = new contactSch({ name, email, message, subject });
    const user = await newUser.save();
    if (user) {
      const templatePathToAdmin = `${__dirname}/../../email/template/contactToAdmin.pug`;
      const templatePathToUser = `${__dirname}/../../email/template/contactToUser.pug`;
      const data = {
        name: user.name,
        email: user.email,
        msg: user.message,
        sub: user.subject,
      };
      let mailOptionsAdmin = {
        from: '"Waft Engine Team" <test@mkmpvtltd.tk>', // sender address
        to: 'navinmishra1717@gmail.com', // list of receivers
        subject: 'User Contacts are here', // Subject line
        text: 'Dear "navinmishra1717@gmail.com" <br/> Some people have contacted us.',
      };
      let mailOptionsUser = {
        from: '"Waft Engine Team" <test@mkmpvtltd.tk>', // sender address
        to: user.email, // list of receivers
        subject: 'Contact Successful', // Subject line
        text: `Dear ${newUser.name} ${contactConfig.usermsg}<br/>`,
      };
      emailTemplate.render(templatePathToAdmin, data, mailOptionsAdmin);
      emailTemplate.render(templatePathToUser, data, mailOptionsUser);

      return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, contactConfig.save, null);
    } else {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, contactConfig.err, null, null);
    }
  } catch (err) {
    next(err);
  }
};
contactController.GetContact = async (req, res, next) => {
  let page;
  let size;
  let searchq;
  let sortquery;
  let selectq;
  const size_default = 10;
  if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
    page = Math.abs(req.query.page);
  } else {
    page = 1;
  }
  if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
    size = Math.abs(req.query.size);
  } else {
    size = size_default;
  }

  if (req.query.sort) {
    let sortField = req.query.sort.slice(1);
    let sortBy = req.query.sort.charAt(0);
    if (sortBy == 1 && !isNaN(sortBy)) {
      // 1 is for ascending
      sortquery = sortField;
    } else if (sortBy == 0 && !isNaN(sortBy)) {
      //0 is for descending
      sortquery = '-' + sortField;
    } else {
      sortquery = '';
    }
  }
  searchq = { is_deleted: false };
  if (req.query.find_name) {
    searchq = { name: { $regex: req.query.find_name, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_subject) {
    searchq = { subject: { $regex: req.query.find_subject, $options: 'i x' }, ...searchq };
  }
  if (req.query.find_added_at) {
    searchq = { added_at: { $regex: req.query.find_added_at, $options: 'i x' }, ...searchq };
  }
  selectq = ('name email message subject added_at');
  let contacts = await otherHelper.getquerySendResponse(contactSch, page, size, sortquery, searchq, selectq, next, '');
  return otherHelper.paginationSendResponse(res, httpStatus.OK, true, contacts.data, contactConfig.gets, page, size, contacts.totaldata);
};
contactController.GetContactById = async (req, res, next) => {
  const id = req.params.id;
  let contact = await contactSch.findOne({ _id: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, contact, null, contactConfig.get, null);
};
module.exports = contactController;
